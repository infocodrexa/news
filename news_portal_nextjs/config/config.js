const production = 'production'
const local = 'dev'
const local_api_url = 'http://localhost:5000'

// 🔥 CHANGE 1: 'https' karo
// 🔥 CHANGE 2: Last se '/api' hata do (Agar laga hai to)
const production_api_url = 'https://api.thelocalmirror.in' 

const mode = production
let base_api_url = ''

if (mode === production) {
    base_api_url = production_api_url
} else {
    base_api_url = local_api_url
}

export { base_api_url }
