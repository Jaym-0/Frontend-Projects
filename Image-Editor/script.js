let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation :{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
}

const imageCanvas = document.querySelector("#image-canvas")
const immageInput = document.querySelector("#image-input")
const filterContainers = document.querySelector(".filters")
const canvasCtx = imageCanvas.getContext("2d")
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")
let file = null;
let image = null;

function createFilterElement(name,unit='%',value,min,max){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name
    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input",(event)=>{
        filters[name].value = input.value
        applyFilters()
    })
    return div
}

function createFilters(){
    Object.keys(filters).forEach(key  =>{
        const filterElement = createFilterElement(key,filters[key].unit,filters[key].value, filters[key].min, filters[key].max)
        filterContainers.appendChild(filterElement)
    })
}

createFilters()

immageInput.addEventListener("change",(event)=>{
    // console.log("Event fired");
    const file = event.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"
    console.log(file);
    const img = new Image();
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img,0,0)
    }
})

function applyFilters() {
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}%)
        contrast(${filters.contrast.value}%)
        saturate(${filters.saturation.value}%)
        hue-rotate(${filters.hueRotation.value}deg)
        blur(${filters.blur.value}px)
        grayscale(${filters.grayscale.value}%)
        sepia(${filters.sepia.value}%)
        opacity(${filters.opacity.value}%)
        invert(${filters.invert.value}%)
    `.trim();

    canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click",()=>{
    filters = {
        brightness:{
            value:100,
            min:0,
            max:200,
            unit:"%"
        },
        contrast:{
            value:100,
            min:0,
            max:200,
            unit:"%"
        },
        saturation :{
            value:100,
            min:0,
            max:200,
            unit:"%"
        },
        hueRotation:{
            value:0,
            min:0,
            max:360,
            unit:"deg"
        },
        blur:{
            value:0,
            min:0,
            max:20,
            unit:"px"
        },
        grayscale:{
            value:0,
            min:0,
            max:100,
            unit:"%"
        },
        sepia:{
            value:0,
            min:0,
            max:100,
            unit:"%"
        },
        opacity:{
            value:100,
            min:0,
            max:100,
            unit:"%"
        },
        invert:{
            value:0,
            min:0,
            max:100,
            unit:"%"
        },
    }
    applyFilters()
    filterContainers.innerHTML = ""
    createFilters()
})

downloadButton.addEventListener("click",()=>{
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    Normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    Drama: {
        brightness: 90,
        contrast: 165,
        saturation: 135,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    Vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 80,
        hueRotation: 8,
        blur: 0,
        grayscale: 15,
        sepia: 55,
        opacity: 100,
        invert: 0
    },

    OldSchool: {
        brightness: 105,
        contrast: 115,
        saturation: 60,
        hueRotation: -10,
        blur: 0,
        grayscale: 40,
        sepia: 75,
        opacity: 100,
        invert: 0
    },

    Noir: {
        brightness: 95,
        contrast: 180,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    Warm: {
        brightness: 110,
        contrast: 110,
        saturation: 130,
        hueRotation: -12,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    Cool: {
        brightness: 100,
        contrast: 110,
        saturation: 115,
        hueRotation: 20,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    Dreamy: {
        brightness: 120,
        contrast: 85,
        saturation: 120,
        hueRotation: 5,
        blur: 2,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    
    Fade: {
        brightness: 115,
        contrast: 75,
        saturation: 85,
        hueRotation: 0,
        blur: 1,
        grayscale: 10,
        sepia: 15,
        opacity: 90,
        invert: 0
    },
    
    Retro: {
        brightness: 108,
        contrast: 95,
        saturation: 75,
        hueRotation: -5,
        blur: 0,
        grayscale: 20,
        sepia: 45,
        opacity: 100,
        invert: 0
    },
    
    Horror: {
        brightness: 75,
        contrast: 180,
        saturation: 40,
        hueRotation: -40,
        blur: 0,
        grayscale: 35,
        sepia: 0,
        opacity: 100,
        invert: 15
    },
    
    Cyberpunk: {
        brightness: 115,
        contrast: 170,
        saturation: 180,
        hueRotation: 40,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach(presetsName =>{
    const presetButton = document.createElement("button")
    presetButton.classList.add("preset-btn")
    presetButton.innerText = presetsName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click",()=>{
        const preset = presets[presetsName]
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName]
            applyFilters()
            filterContainers.innerHTML = ""
            createFilters()
        })
    })

})