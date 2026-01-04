const production = 'production'
const development = 'development'

const mode = development
let base_url = ''

if (mode === production) {
    base_url = ""
} else {
    base_url = 'http://localhost:5000'
}

export { base_url }


// const mode = "production";
// let base_url = "";

// if (mode === "production") {
//   // Live Server URL (HTTPS)
//   base_url = "https://api.thelocalmirror.in";
// } else {
//   // Local Testing URL
//   base_url = "http://localhost:5000";
// }

// export { base_url };
