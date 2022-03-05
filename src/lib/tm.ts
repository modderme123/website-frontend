export type TM = Uint8Array;

export enum TMDecisionStatus {
	UNDECIDED,
	HEURISTICALLY_DECIDED_HALT,
	HEURISTICALLY_DECIDED_NON_HALT,
	DECIDED_HALT,
	DECIDED_NON_HALT
}

export function tm_trace_to_image(ctx: CanvasRenderingContext2D, canvas, machine, width = 900, height = 1000) {
	let imgData = ctx.createImageData(width, height);

	let tape = {};
	let curr_state = 0;
	let curr_pos = 0;

	for (let row = 0; row < height; row += 1) {
		let last_pos = curr_pos;
		[curr_state, curr_pos] = step(machine, curr_state, curr_pos, tape);
		if (curr_state === null) {
			break
		}

		for (let col = 0; col < width; col += 1) {
			const pos = col - width * 0.5


			if (tape[pos] != undefined) {

				const imgIndex = 4 * (row * width + col)
				let color = 255;
				if (tape[pos] === 0) color = 0;
				imgData.data[imgIndex + 0] = color
				imgData.data[imgIndex + 1] = color
				imgData.data[imgIndex + 2] = color
				imgData.data[imgIndex + 3] = 255
			}

		}

	}
	var renderer = document.createElement('canvas');
	renderer.width = width;
	renderer.height = height;
	// render our ImageData on this canvas
	renderer.getContext('2d').putImageData(imgData, 0, 0);

	ctx.drawImage(renderer, 0, 0, width, height, 0, 0, canvas.width, canvas.height)


}

export function step(machine: TM, curr_state, curr_pos, tape) {
	if (tape[curr_pos] === undefined) {
		tape[curr_pos] = 0
	}

	let write = machine[curr_state * 6 + 3 * tape[curr_pos]]
	let move = machine[curr_state * 6 + 3 * tape[curr_pos] + 1]
	let goto = machine[curr_state * 6 + 3 * tape[curr_pos] + 2] - 1

	if (goto == -1)
		return [null, null]

	tape[curr_pos] = write
	let next_pos = curr_pos + (move ? -1 : 1)
	return [goto, next_pos]
}