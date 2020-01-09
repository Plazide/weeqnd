module.exports = {
	siteMetadata: {
		title: "Spotifest",
		description: "Gör festen roligare genom att låta alla gäster köa musik från sin egen telefon. ",
		author: "@gatsbyjs",
		siteUrl: "https://spotifest.se"
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-plugin-s3",
			options: {
				bucketName: "spotifest.se",
				protocol: "https",
				hostname: "spotifest.se"
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: `${__dirname}/src/images`
			}
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /images/
				}
			}
		},
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "SpotiFest",
				short_name: "SpotiFest",
				start_url: "/",
				background_color: "#0B1D2E",
				theme_color: "#193C5E",
				display: "minimal-ui",
				icon: "src/images/logo/icon.png" // This path is relative to the root of the site.
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
	proxy: {
		prefix: "/api",
		url: "http://localhost:8001"
	}
};
