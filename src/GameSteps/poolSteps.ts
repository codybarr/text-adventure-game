import { ABOUT_TO_DROWN, DEAD, WET } from "../conditions.ts";
import { BEGIN } from "./introSteps.ts";

export const MERMAID = () => ({
	message:
		'As you bravely approach the creature you hear a soft beautiful voice begin singing. You take a closer look at the creature and you notice its long feminine hair and fish tail. It sings, "Is it you? Is that you? The one to bring about the truth?"',
	valid: [],
	invalid: [],
})

export const MERMAID_SURFACES = () => ({
	message:
		"As you reach the surface and desperately fill your lungs with air, you a creature shoot up out of the water and beach itself on a large rock outside of the pool.",
	valid: [
		{
			answer: ["swim go approach", "shore creature it"],
			nextStep: MERMAID,
		},
	],
	invalid: [],
})

export const DROWNED = () => ({
	message: "You've Drowned.",
	valid: [],
	invalid: [],
})

export const SHADOW_SIGHTING = () => ({
	message:
		"You swim towards the shadow. As you do, it turns and reveals an eerie side profile and a sword-like tail. You're almost out of air!",
	valid: [
		{
			answer: ["swim get", "surface up air"],
			nextStep: MERMAID_SURFACES,
			removeConditions: [ABOUT_TO_DROWN],
		},
		{
			answer: ["attack", "it tail creature"],
			nextStep: DROWNED,
			conditions: [DEAD],
			removeConditions: [ABOUT_TO_DROWN, WET],
		},
	],
	invalid: [],
})

export const POOL_DEPTHS = () => ({
	message:
		"You take a deep breath and dive down into the depths of the pool. You see a faint shadow approaching you slowly.",
	valid: [
		{
			answer: ["approach stay wait towards", "shadow figure it"],
			nextStep: SHADOW_SIGHTING,
			conditions: [ABOUT_TO_DROWN]
		},
		{
			answer: ["swim get", "away surface shore"],
			nextStep: BEGIN,
		},
	],
	invalid: [],
})

export const POOL = () => ({
	message: "You enter the pool of water.",
	valid: [
		{
			answer: ["dive swim", "under water surface down bottom"],
			nextStep: POOL_DEPTHS,
		},
	],
	invalid: [],
})