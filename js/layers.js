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
        if (hasMilestone('f', 0)) mult = mult.times(10)
        if (inChallenge('f', 11)) mult = mult.times(0.1)

        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        gain = new Decimal(0)
        if(hasMilestone('f', 0)) gain = gain.add(0.1)
        return gain
    },
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
            unlocked() {return hasUpgrade('p', 11)},
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
        13: {
            title: "And Thrird Comes Later",
            description: "Points Boost Prestige Point gain.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            unlocked() {return hasUpgrade('p', 11)},
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
        14: {
            title: "And Last Comes Last",
            description: "Prestige Points and Points Boost Point gain.",
            cost: new Decimal(20),
            effect() {
                return player.points.add(1).pow(0.3).times(player[this.layer].points.add(1).pow(0.1))
            },
            unlocked() {return hasUpgrade('p', 13)},
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
    exponent: 0.35,
    gainMult() {
        mult = new Decimal(1)
        if (hasMilestone('f', 0)) mult = mult.times(10)
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
            done() { return player[this.layer].points.gte(1) },
        },
        1: {
            requirementDescription: "2 Stige",
            effectDescription: "Stige Points Boost Points. Boost: (S + 1)",
            done() { return player[this.layer].points.gte(2) },
            effect() {
                return player[this.layer].points.add(1)
            },
            unlocked() {return hasMilestone("s", 0)},
        },
        2: {
            requirementDescription: "3 Stige",
            effectDescription: "Stige Points Boost Prestige Points. Boost: (S^0.3 + 1)",
            done() { return player[this.layer].points.gte(3) },
            effect() {
                return player[this.layer].points.pow(0.3).add(1)
            },
            unlocked() {return hasMilestone('s', 1)},
        },
        3: {
            requirementDescription: "5 Stige",
            effectDescription: "Unlock Finish Layer",
            done() { return player[this.layer].points.gte(5) },
            unlocked() {return hasMilestone('s', 2)},
        },
    },
    layerShown() { return true },
})

addLayer("f", {
    name: "finish",
    symbol: "F",
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},

        baseResource: "points",
    baseAmount() { return player.points },

    requires: new Decimal(75000),

    type: "normal",
    exponent: 0.1,

    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    color: "#dbcf1c",
    resource: "finish points",
    row: 1,
    hotkeys: [
        { key: "f", description: "F: Reset for Finish points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],

    milestones: {
        0: {
            requirementDescription: "1 Finish",
            effectDescription: "x10 Points, Prestige and Stige Points and gain 10% of Prestige Points. Good Job.",
            done() { return player[this.layer].points.gte(1) },
        },
        1: {
            requirementDescription: "2 Finish",
            effectDescription: "Unlock a challenge and x2 Points",
            done() { return player[this.layer].points.gte(2) },
        },
    },

    challenges: {
        11: {
            name: "First is the Best?",
            challengeDescription: "/4 Points and /10 Prestige Points",
            canComplete: function() {return player.points.gte(100)},
            goalDescription: "Get 100 Points",
            rewardDescription: "x5 Points and Unlock 1 Finish Upgrade",
            unlocked() {return hasMilestone('f', 1)},
        },
    },

    upgrades: {
        11: {
            title: "Nothing",
            description: "(Free)",
            cost: new Decimal(1),
            pay() {return 0},
            unlocked() {return hasChallenge('f', 11)},
        },
        12: {
            title: "I said Nothing",
            description: "(Free)",
            cost: new Decimal(1),
            pay() {return 0},
            unlocked() {return hasUpgrade('f', 11)},
        },
        13: {
            title: "Stop",
            description: "(Free)",
            cost: new Decimal(1),
            pay() {return 0},
            unlocked() {return hasUpgrade('f', 12)},
        },
        14: {
            title: "Fine x1 Points",
            description: "(Free)",
            cost: new Decimal(1),
            pay() {return 0},
            unlocked() {return hasUpgrade('f', 13)},
        },
        15: {
            title: "Ok Real Boost",
            description: "x1.0001 Points (Free)",
            cost: new Decimal(1),
            pay() {return 0},
            unlocked() {return hasUpgrade('f', 14)},
        },
        21: {
            title: "Ok no More",
            description: "x2.5 Points (Free?)",
            cost: new Decimal(3),
            pay() {return 1},
            unlocked() {return hasUpgrade('f', 15)},
        },
    },

    layerShown() {
        let Vis = false
        if (hasMilestone('s', 3)) Vis = true
        if (hasMilestone('f', 0)) Vis = true
        return Vis
    },
})
