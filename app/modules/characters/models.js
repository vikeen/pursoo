import {LEVEL_CONFIG} from "../../config/levels";
import {round} from "../../components/Util";

export class Character {
    constructor(uid, user, name="My Character") {
        this.addedByUser = user.uid;
        this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fcharacters%2Felf-male-fighter.png?alt=media&token=eab34854-76c6-4ab1-8f8a-1b50fea84d6a";
        this.level = 1;
        this.name = name;
        this.xp = 0;
        this.xpTotal = 0;
        this.uid = uid;
    }

    static addXp(character, xpToAdded) {
        const newCurrentXp = character.xp + xpToAdded;
        const levelConfig = LEVEL_CONFIG[character.level];
        const xpNeededToLevelUp = levelConfig.xpNeeded;

        if (levelConfig.isMaxLevel) {
            return character
        }
        if (newCurrentXp > xpNeededToLevelUp) {
            character.xp = newCurrentXp - xpNeededToLevelUp;
            character.xpTotal += xpToAdded;
            character.level += 1;
            return character;
        } else {
            character.xp += xpToAdded;
            character.xpTotal += xpToAdded;
            return character;
        }
    }

    static percentOfLevelComplete(character) {
        const levelConfig = LEVEL_CONFIG[character.level];
        const xpNeededToLevelUp = levelConfig.xpNeeded;
        return round(character.xp / xpNeededToLevelUp, 2);
    }

    toJSON() {
        return {
            addedByUser: this.addedByUser,
            imageUrl: this.imageUrl,
            level: this.level,
            name: this.name,
            xp: this.xp,
            xpTotal: this.xpTotal,
            uid: this.uid
        }
    }
}