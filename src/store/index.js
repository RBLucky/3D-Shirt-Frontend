import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './cruvio_symbol.png',
    fullDecal: './cruvio_symbol.png'
})

export default state