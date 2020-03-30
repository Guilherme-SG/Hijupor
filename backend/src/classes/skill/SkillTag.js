const ConditionalSystem = require("../ConditionalSystem");
const gameSystem = require("../GameSystem")

class SkillTag {
    constructor() {
        this.conditionalSystem = new ConditionalSystem();
    }
    
    getCalculationFunction(nameFunction) {
        const functions = {
            byFixedValue: ({ skill }) => skill.tags.healing.fixedValue,
            byFormula: ({ caster, skill, target, tag }) => eval(skill.tags[tag].formula),
            byPercentualOf: ({ caster, skill, target, tag }) => {
                let { reference, percentual } = skill.tags[tag];
                return percentual * eval(reference);
            }
        };
        return functions[nameFunction];
    }

    evaluateTarget(target) {
        const { type } = target

        const targetTypes = {
            caster: () => gameSystem.getCaster(),
            actor: () => gameSystem.getSelectedActor(),
            party: ({ filtrable, filter }) => {
                const party = gameSystem.getSelectedParty()

                if(!filtrable) return party.getMembers()

                this.conditionalSystem.filter()
                
            }
        }
        
        return targetTypes[type](target)
    }

    active(caster, skill) { }
}

exports.SkillTag = SkillTag