addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasMilestone('s', 0)) mult = mult.times(2)

        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "First Comes First",
            description: "Double your Point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "And Second Comes Next",
            description: "Prestige Points Boost Point gain.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
        13: {
            title: "And Thrird Comes Later",
            description: "Points Boost Prestige Point gain.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
        14: {
            title: "And Last Comes Last",
            description: "Prestige Points and Points Boost Point gain.",
            cost: new Decimal(20),
            effect() {
                return player.points.add(1).pow(player[this.layer].points.times(0.15))
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
    },
    layerShown() { return true },
})

addLayer("s", {
    name: "stige",
    symbol: "S",
    position: 1,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#1BAC00",
    requires: new Decimal(200),
    resource: "stige points",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "static",
    exponent: 0.3,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        { key: "s", description: "S: Reset for Stige points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    milestones: {
        0: {
            requirementDescription: "1 Stige",
            effectDescription: "Double Points and Prestige.",
            done() { return player[this.layer].points.gte(1) }
        },
        1: {
            requirementDescription: "2 Stige",
            effectDescription: "Stige Points Boost Points.",
            done() { return player[this.layer].points.gte(1) },
            effect() {
                return player[this.layer].points.add(1)
            },
			Unlocked() {return false}
        },
    },
    layerShown() { return true },
})
