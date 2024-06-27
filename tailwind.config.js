/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				ninja:
					"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
				"custom-loader":
					"30px 7.5px #214E68, -30px 7.5px #214E68, -30px 7.5px #214E68",
			},
		},
	},
	plugins: [],
};
