import {LEVEL_CONFIG} from "../../config/levels";
import {round} from "../../components/Util";

export class Character {
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

        const percentComplete = (character.xp / xpNeededToLevelUp) * 100;
        return round(percentComplete, 2);
    };
}