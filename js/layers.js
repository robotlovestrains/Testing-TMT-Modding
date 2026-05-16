addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
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
            description: "Increase Point gain.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
        13: {
            title: "And Thrird Comes Later",
            description: "Increase Prestage Point gain.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
        14: {
            title: "And Last Comes Last",
            description: "Unlock 3 Buyables.",
            cost: new Decimal(15),
            onPurchase() {
                this.layer.buyables.unlocked = true
            }
        },
    },
    buyables: {
        11: {
            title: "First is the Worst",
            cost(x) { return new Decimal(1).mul(x) },
            effect() {
                return this.getBuyableAmount(this.layer, this.id).mul(0.25).add(1)
            },
            display() { return "Boost Points by x" + format(upgradeEffect(this.layer, this.id)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
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
    layerShown() { return true }
})
