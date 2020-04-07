const ConditionalSystem = require("../ConditionalSystem");
const gameSystem = require("../managers/SkillManager")

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
            party: ({ filters }) => {                
                const party = gameSystem.getSelectedParty()

                if(!filters) return party.getMembers()
                
                return this.conditionalSystem.filter(party.getMembers(), filters)
                
            }
        }
        
        return targetTypes[type](target)
    }

    active(caster, skill) { }
}

exports.SkillTag = SkillTag