class StaminaShield {
    constructor(owner) {
        this.currentHP = owner.currentStamina
        this.totalHP = owner.totalStamina
        this.owner = owner
    }

    updateFromOwner() {
        this.currentHP = this.owner.currentStamina
        this.totalHP = this.owner.totalStamina
    }

    updateToOwner() {
        this.owner.currentStamina = this.currentHP
        this.owner.totalStamina = this.totalHP
    }

    takeDamage(damage) {
        let remainingDamage = damage - this.currentHP
        this.currentHP -= damage
        this.updateToOwner()

        return remainingDamage
    }

    break() {
        this.currentHP = 0
        this.totalHP = 0

        this.updateToOwner()
    }

    isBroken = () => this.currentHP <= 0
    isNotBroken = () => !this.isBroken()

    canBeBroken = (damageAmount) => damageAmount >= this.currentHP

    heal(heal) {
        this.currentHP += heal

        if (this.isCurrentHPGreaterThanTotal()) {
            this.totalHP = this.currentHP
        }

        this.updateToOwner()
    }

    isCurrentHPGreaterThanTotal() {
        return this.currentHP > this.totalHP
    }

    getPercentualHP() {
        return this.currentHP / this.totalHP
    }
}

module.exports = StaminaShield