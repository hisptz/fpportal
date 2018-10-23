module.exports = {
    output: {
        // your stuff
        publicPath: 'src/'
    },
    devServer: {
        contentBase: 'src/', //disk location
        watchContentBase: true,
        proxy: {
            "/api": {
                "target": "https://hmisportal.moh.go.tz/dhis",
                "auth":"vincentminde:StrongPasswordABC123",
                "changeOrigin": true
            },
            "/dhis/api": {
                "target": "https://hmisportal.moh.go.tz",
                "auth":"vincentminde:StrongPasswordABC123",
                "changeOrigin": true
            },
            "/dhis-web-commons": {
                "target": "https://hmisportal.moh.go.tz/dhis",
                "auth":"vincentminde:StrongPasswordABC123",
                "changeOrigin": true
            },
            "/icons": {
                "target": "https://hmisportal.moh.go.tz/dhis",
                "auth":"vincentminde:StrongPasswordABC123",
                "changeOrigin": true
            },
            "/images": {
                "target": "https://hmisportal.moh.go.tz/dhis",
                "auth":"vincentminde:StrongPasswordABC123",
                "changeOrigin": true
            },
            "/ARDS-Archive": {
                "target": "https://hmisportal.moh.go.tz/dhis",
                "auth":"vincentminde:StrongPasswordABC123",
                "changeOrigin": true
            }
        }
    }
}