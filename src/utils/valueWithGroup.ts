const valueWithGroup = (value: number, group: number) => {
	const inv = 1.0 / group;
  	return Math.floor(value * inv) / inv;
};

export default valueWithGroup;