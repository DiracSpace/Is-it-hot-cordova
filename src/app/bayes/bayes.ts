interface IMap<V> {
    [key: string]: V
}

interface Parameter {
    feature: string
    attribute: string
}

interface Classifier {
    train(obj: any): void
    classify(feature: string, obj?: any): void
}

interface NaiveBayesState {
    features: IMap<IMap<number>>
    correlations: IMap<IMap<IMap<IMap<number>>>>
}

interface Accumulator {
    [x: string]: number;
}

export class NaiveBayes implements Classifier {

    /**
     * creates a new classifier.
     * @returns {NaiveBayes}
     */
    constructor(public state?: NaiveBayesState) {
        this.state = this.state || {
            features: {},
            correlations: {}
        }
    }

    /**
     * trains this classifer with this object.
     * @param {any} the javascript object to train this classifier with.
     * @returns {void}
     */
    public train(obj: any): void {
        let parameters = Object.keys(obj).map<Parameter>(key => ({ feature: key, attribute: obj[key] }))
        parameters.forEach(parameter => this.insert_feature(parameter))
        parameters.forEach(left => parameters.forEach(right => {
            if (left.feature === right.feature) return
            this.insert_correlation(left, right)
        }))
    }

    /**
     * classifies this feature with the given object.
     * @param {string} the feature to classify.
     * @param {any} an optional feature 
     * @returns {any} the bayes prediction for the given feature.
     */
    public classify(feature: string, obj?: any): any {
        if (this.state.features[feature] === undefined) {
            return {}
        }
        else if (obj === undefined || Object.keys(obj).length === 0) {
            let sum = Object.keys(this.state.features[feature])
                .map(attribute => this.state.features[feature][attribute])
                .reduce((acc, count) => acc + count, 0)
            return Object.keys(this.state.features[feature])
                .reduce((acc: Accumulator, attribute: string | number) => {
                    acc[attribute] = this.state.features[feature][attribute] / sum
                    return acc
                }, {})
        }
        else {
            let sums = Object.keys(obj).reduce((sums: Accumulator, inner_feature: string | number) => {
                sums[inner_feature] = Object.keys(this.state.correlations[feature]).reduce((sum, attribute) => {
                    if (obj[inner_feature] !== undefined
                        && this.state.correlations[feature][attribute][inner_feature] !== undefined
                        && this.state.correlations[feature][attribute][inner_feature][obj[inner_feature]] !== undefined) {
                        return sum + this.state.correlations[feature][attribute][inner_feature][obj[inner_feature]]
                    } else return sum
                }, 0);
                return sums
            }, {})
            let result = Object.keys(this.state.correlations[feature]).reduce((result: Accumulator, attribute: string | number) => {
                let probabilities = Object.keys(obj).reduce((probabilities: Accumulator, inner_feature: string | number) => {
                    if (obj[inner_feature] !== undefined
                        && this.state.correlations[feature][attribute][inner_feature] !== undefined
                        && this.state.correlations[feature][attribute][inner_feature][obj[inner_feature]] !== undefined) {
                        probabilities[inner_feature] = this.state.correlations[feature][attribute][inner_feature][obj[inner_feature]] / sums[inner_feature]
                    } else probabilities[inner_feature] = 0
                    return probabilities
                }, {})
                result[attribute] = Object.keys(probabilities).reduce((acc, feature) => acc * probabilities[feature], 1)
                return result
            }, {})

            let sum = Object.keys(result).reduce((acc: number, attribute: string | number) => acc + result[attribute], 0)
            return Object.keys(result).reduce((acc: Accumulator, attribute: string | number) => {
                acc[attribute] = sum > 0 ? result[attribute] / sum : 0
                return acc
            }, {})
        }
    }

    /**
     * inserts this feature into the feature map, and increments its occurance value +1
     * @param {Parameter} the feature/attribute pair.
     * @returns {void}
     */
    private insert_feature(parameter: Parameter): void {
        if (this.state.features[parameter.feature] === undefined) this.state.features[parameter.feature] = {}
        if (this.state.features[parameter.feature][parameter.attribute] === undefined) {
            this.state.features[parameter.feature][parameter.attribute] = 1
        } else this.state.features[parameter.feature][parameter.attribute] += 1
    }

    /**
     * inserts this correlation in to the correlation map. increments its occurance value +1.
     * This function updates both left and right, feature/attribute pairs, which is a duplication
     * of data, but no more than representing the data in a ND matrix.
     * @param {Parameter} the left feature/attribute pair.
     * @param {Parameter} the right feature/attribute pair.
     * @returns {void}
     */
    private insert_correlation(left: Parameter, right: Parameter): void {
        let needs_update = false
        if (this.state.correlations[left.feature] === undefined) this.state.correlations[left.feature] = {}
        if (this.state.correlations[left.feature][left.attribute] === undefined) this.state.correlations[left.feature][left.attribute] = {}
        if (this.state.correlations[left.feature][left.attribute][right.feature] === undefined) this.state.correlations[left.feature][left.attribute][right.feature] = {}
        if (this.state.correlations[left.feature][left.attribute][right.feature][right.attribute] === undefined) {
            this.state.correlations[left.feature][left.attribute][right.feature][right.attribute] = 1
            needs_update = true
        } else this.state.correlations[left.feature][left.attribute][right.feature][right.attribute] += 1
        if (needs_update === false) return
        Object.keys(this.state.correlations).forEach(left_feature => {
            Object.keys(this.state.correlations).forEach(right_feature => {
                if (left_feature === right_feature) return;
                Object.keys(this.state.correlations[left_feature]).forEach(left_attribute => {
                    Object.keys(this.state.correlations[right_feature]).forEach(right_attribute => {
                        if (this.state.correlations[left_feature] === undefined) this.state.correlations[left_feature] = {}
                        if (this.state.correlations[left_feature][left_attribute] === undefined) this.state.correlations[left_feature][left_attribute] = {}
                        if (this.state.correlations[left_feature][left_attribute][right_feature] === undefined) this.state.correlations[left_feature][left_attribute][right_feature] = {}
                        if (this.state.correlations[left_feature][left_attribute][right_feature][right_attribute] === undefined)
                            this.state.correlations[left_feature][left_attribute][right_feature][right_attribute] = 0
                    })
                })
            })
        })
    }
}