import React from 'react';
import {Character} from "../../models";
import {LEVEL_CONFIG} from "../../../../config/levels";

const user = {
    uid: "s8iwMDpipGMqRnFfn9HJgAHPoLT2"
};

it('create character', () => {
    const character = new Character("m7iwMDmgmGMqRnFfn9HJgAHPoLL*", user, "Jimbo", "imageUrl");
    expect(character).toEqual({
        name: "Jimbo",
        level: 1,
        xp: 0,
        xpTotal: 0,
        imageUrl: "imageUrl",
        uid: "m7iwMDmgmGMqRnFfn9HJgAHPoLL*",
        addedByUser: user.uid
    });
});

it('create character and serializd to JSON', () => {
    const character = new Character("m7iwMDmgmGMqRnFfn9HJgAHPoLL*", user, "Jimbo", "imageUrl").toJSON();
    expect(character).toEqual({
        name: "Jimbo",
        level: 1,
        xp: 0,
        xpTotal: 0,
        imageUrl: "imageUrl",
        uid: "m7iwMDmgmGMqRnFfn9HJgAHPoLL*",
        addedByUser: user.uid
    });
});

it('get percent level complete xp', () => {
    const character = new Character("m7iwMDmgmGMqRnFfn9HJgAHPoLL*", user, "Jimbo", "imageUrl");
    character.xp = 50;

    expect(Character.percentOfLevelComplete(character)).toEqual(0.25);
});

it('add xp to character', () => {
    const character = new Character("m7iwMDmgmGMqRnFfn9HJgAHPoLL*", user, "Jimbo", "imageUrl");
    Character.addXp(character, 100);

    expect(character.xp).toBe(100);
    expect(character.xpTotal).toBe(100);
    expect(character.level).toBe(1);
});

it('add xp to character and level up', () => {
    const character = new Character("m7iwMDmgmGMqRnFfn9HJgAHPoLL*", user, "Jimbo", "imageUrl");
    Character.addXp(character, 100);

    expect(character.xp).toBe(100);
    expect(character.xpTotal).toBe(100);
    expect(character.level).toBe(1);

    Character.addXp(character, 100);

    expect(character.xp).toBe(0);
    expect(character.xpTotal).toBe(200);
    expect(character.level).toBe(2);
});

it("do not add xp to max level character", () => {
    const character = new Character("m7iwMDmgmGMqRnFfn9HJgAHPoLL*", user, "Jimbo", "imageUrl");
    const maxLevel = Math.max.apply(null, Object.keys(LEVEL_CONFIG));

    expect(character.xp).toBe(0);
    expect(character.xpTotal).toBe(0);
    expect(character.level).toBe(1);

    character.level = maxLevel;

    Character.addXp(character, 100);

    expect(character.xp).toBe(0);
    expect(character.xpTotal).toBe(0);
    expect(character.level).toBe(10);
});