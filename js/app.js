//---------------------PANEL-------------------
const panel = document.querySelector(`#panel`);
const panelImg = document.getElementById('panelImg');
const panelText = document.getElementById('panelText');

const buttonClose = document.querySelector(`#button-close`);
const buttonImg = document.getElementById('buttonImg');
const buttonText = document.getElementById('buttonText');

//cuando haga click en el boton de cierre se cierra el panel (aside completo)
//agregar la clase ocultar

buttonClose.addEventListener('click', () => {
	panel.classList.add('ocultar');
});

//cuando hago click en el botn img o en el botn text debe verse el panel
//quitar la clase ocultar

//cuando haga click en en boton text abrir el panel, se ve la seccion de texto
//y se oculta la imagen
//se ve img y texto
//se ve img

buttonText.addEventListener('click', () => {
	panel.classList.remove('ocultar');
	panelImg.classList.remove('ocultar');
	panelText.classList.add('ocultar');
});

buttonImg.addEventListener('click', () => {
	panel.classList.remove('ocultar');
	panelText.classList.remove('ocultar');
	panelImg.classList.add('ocultar');
});

//-----------MODO NOCTURNO/DIURNO----------------

const body = document.querySelector('body');
const buttonTheme = document.getElementById('buttonTheme');
const textTheme = document.getElementById("textTheme");
const iconTheme = document.getElementById("iconTheme");

buttonTheme.addEventListener(`click`, () => {
	body.classList.toggle("light-theme");
	body.classList.toggle("dark-theme");
	if (textTheme.textContent === "Modo Claro") {
		textTheme.textContent = "Modo Oscuro";
		iconTheme.className = "fas fa-moon";

	} else {
		textTheme.textContent = "Modo Claro";
		iconTheme.className = "far fa-sun"
	}
});

//------------------------IMAGEN---------------------//

//------------------------URL--------------------------//

const urlImg = document.getElementById("urlImg");
const divImg = document.getElementById("divImg");

urlImg.addEventListener('input', () => {
	const url = urlImg.value;
	divImg.style.backgroundImage = `url("${url}")`;

});

//-----------CARGAR IMAGEN----------------------//
const cargarArchivo = document.getElementById("cargarArchivo");
cargarArchivo.addEventListener("input", function () {
	const file = this.files[0];
	const reader = new FileReader();
	reader.addEventListener("load", function () {
		divImg.style.backgroundImage = `url(${this.result})`;
	});
	reader.readAsDataURL(file);

});

//---------------------FONDO COLOR---------------------//

let inputColor = document.getElementById("inputColor");
const nombreColor = document.getElementById("nombreColor");

const cambiarColorFondo = () => {
	divImg.style.backgroundColor = inputColor.value
	nombreColor.textContent = inputColor.value
	nombreColor.textContent = inputColor.value.toUpperCase();
};

inputColor.addEventListener(`input`, cambiarColorFondo);

//-------------------------FONDO---------------//

const blendMode = document.getElementById(`blendMode`);

blendMode.addEventListener(`input`, () => {
	divImg.style.backgroundBlendMode = blendMode.value

});

//-----------------------FILTROS-----------//

const filtersContainer = document.getElementById("styles-filters")

const properties = [
    { name: "Brightness"    , default: 1    , min: 0    , max: 10   , step: 0.1 , convertValue: (val) => `${val}`   },
    { name: "Opacity"       , default: 1    , min: 0    , max: 1    , step: 0.1 , convertValue: (val) => `${val}`   },
    { name: "Contrast"      , default: 100  , min: 100  , max: 1000 , step: 1   , convertValue: (val) => `${val}%`  },
    { name: "Blur"          , default: 0    , min: 0    , max: 10   , step: 0.1 , convertValue: (val) => `${val}px` },
    { name: "Grayscale"     , default: 0    , min: 0    , max: 100  , step: 1   , convertValue: (val) => `${val}%`  },
    { name: "Sepia"         , default: 0    , min: 0    , max: 100  , step: 1   , convertValue: (val) => `${val}%`  },
    { name: "Hue-rotate"    , default: 0    , min: 0    , max: 360  , step: 1   , convertValue: (val) => `${val}deg`},
    { name: "Saturate"      , default: 100  , min: 100  , max: 1000 , step: 10  , convertValue: (val) => `${val}%`  },
    { name: "Invert"        , default: 1    , min: 0    , max: 100  , step: 0.1 , convertValue: (val) => `${val}%`  }
]

const createSlider = (property) => {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = property.name + "-slider";
    slider.min = property.min;
    slider.max = property.max;
    slider.step = property.step;
    slider.value = property.default;

    const label = document.createElement("label");
    label.innerText = property.name;
    label.htmlFor = slider.id;
    
    [label, slider].forEach(el => filtersContainer.appendChild(el))
}

properties.forEach(createSlider)

const propertiesElements = properties.map(property => ({
    ...property, 
    element: document.getElementById(property.name + "-slider")
}))
console.log(propertiesElements);

const updateFilter = () => {
    const filter = propertiesElements.map(el => `${el.name}(${el.convertValue(el.element.value)})`).join(" ");
    divImg.style.filter = filter;
};

propertiesElements.forEach(property => property.element.addEventListener("change", updateFilter));

console.log(propertiesElements);

const resetDefaultValues = () => { 
    propertiesElements.forEach(property => {
        property.element.value = property.default 
    })
    updateFilter()
}

document.getElementById("btnRestablecer").addEventListener("click", resetDefaultValues);


//--------BOTÓN DE DESCARGA---------------
const btnDownload = document.getElementById('btnDownload');
const imgTextContainer = document.getElementById("imgTextContainer");
btnDownload.addEventListener('click', () => {
	const anchoImg = imgTextContainer.offsetWidth;
	const altoImg = imgTextContainer.offsetWidth;
	imgTextContainer.style.width = anchoImg * 2 + 'px';
	imgTextContainer.style.height = altoImg * 2 + 'px';

	domtoimage.toBlob(document.getElementById('divImg'))
		.then(function (blob) {
			window.saveAs(blob, 'my-node.png');
			imgTextContainer.style.width = anchoImg + 'px';
			imgTextContainer.style.height = altoImg + 'px';

		});
});




//-------------------TEXTO SUPERIOR E INFERIOR-------------//

const topTextInput = document.getElementById("topTextInput");
const bottomTextInput = document.getElementById("bottomTextInput");
const topText = document.getElementById("topText");
const bottomText = document.getElementById("bottomText");


topTextInput.addEventListener('input', () => {
	const textSup = topTextInput.value
	topText.innerText = textSup;
});

bottomTextInput.addEventListener('input', () => {
	//const textInf = bottomTextInput.value;  
	bottomText.innerText = bottomTextInput.value;
});


//-------SIN TEXTO SUPERIOR / INFERIOR----------------//


const sinTextoSuperior = document.getElementById("sinTextoSuperior");
const sinTextoInferior = document.getElementById("sinTextoInferior");

const checkedNonChecked = () => {
	if (sinTextoSuperior.checked) {
		topText.classList.add('ocultar');
	} else {
		topText.classList.remove("ocultar");
	};

	if (sinTextoInferior.checked) {
		bottomText.classList.add('ocultar');
	} else {
		bottomText.classList.remove('ocultar');
	};
};

sinTextoSuperior.addEventListener("change", checkedNonChecked);
sinTextoInferior.addEventListener("change", checkedNonChecked);

//-------------FUENTE----------
const tipoFuente = document.getElementById("tipoFuente");
tipoFuente.addEventListener("input", () => {
	const fuente = tipoFuente.value;
	topText.style.fontFamily = fuente;
	bottomText.style.fontFamily = fuente;
});

// ---------------TAMAÑO FUENTE-----------------

const tamanioFuente = document.getElementById("tamanioFuente");
tamanioFuente.addEventListener("input", () => {
	const tamanioF = tamanioFuente.value;
	topText.style.fontSize = tamanioF + 'px';
	bottomText.style.fontSize = tamanioF + 'px';

});

//----------------ALINEACION DEL TEXTO-------------
const textLeftAlign = document.getElementById("textLeftAlign");
const textCenterAlign = document.getElementById("textCenterAlign");
const textRightAlign = document.getElementById("textRightAlign");

const alinearTexto = (alineacion) => {
	topText.style.textAlign = alineacion;
	bottomText.style.textAlign = alineacion;
};

textLeftAlign.addEventListener('click', () => {
	alinearTexto("left")
});

textCenterAlign.addEventListener('click', () => {
	alinearTexto('center')
});

textRightAlign.addEventListener('click', () => {
	alinearTexto('right')
});


//---------------COLOR TEXTO----------
const colorTexto = document.getElementById("colorTexto");
const nombreColorTx = document.getElementById("nombreColorTx")

colorTexto.addEventListener("input", () => {
	topText.style.color = colorTexto.value;
	bottomText.style.color = colorTexto.value;
	nombreColorTx.textContent = colorTexto.value;
	nombreColorTx.innerHTML = colorTexto.value.toUpperCase();

});

//---------------FONDO DEL TEXTO--------------------//
const colorTxFondo = document.getElementById("colorTxFondo");
const fondoTransparente = document.getElementById("fondoTransparente");
const nombreFondoClTx = document.getElementById("nombreFondoClTx");

colorTxFondo.addEventListener("input", () => {
	topText.style.backgroundColor = colorTxFondo.value;
	bottomText.style.backgroundColor = colorTxFondo.value;
	nombreFondoClTx.textContent = colorTxFondo.value;
	nombreFondoClTx.innerHTML = colorTxFondo.value.toUpperCase();
});

//---------------FONDO TRANSPARENTE ------------------//
fondoTransparente.addEventListener("input", () => {
	if (fondoTransparente.checked) {
		colorTexto.disabled = true;
		colorTxFondo.disabled = true;
		topText.style.position = 'absolute';
		bottomText.style.position = 'absolute';
		topText.style.backgroundColor = 'transparent';
		bottomText.style.backgroundColor = 'transparent';
	} else {
		colorTexto.disabled = false;
		colorTxFondo.disabled = false;
		topText.style.position = 'static';
		bottomText.style.position = 'static';
		const color = colorTxFondo.value;
		topText.style.backgroundColor = color;
		bottomText.style.backgroundColor = color;

	};
});


//-----------------CONTORNO--------------------//


const sinCont = document.getElementById("sinCont");
const contCLaro = document.getElementById("contClaro");
const contOscuro = document.getElementById("contOscuro");

const contornoTexto = (contorno) => {
	topText.style.textShadow = contorno;
	bottomText.style.textShadow = contorno;
};

sinCont.addEventListener('click', () => {
	contornoTexto("none")
});

contCLaro.addEventListener('click', () => {
	contornoTexto('rgb(255 255 255) 2px 2px, rgb(255 255 255) -2px 2px, rgb(255 255 255) 2px -2px, rgb(255 255 255) -2px -2px')
});

contOscuro.addEventListener('click', () => {
	contornoTexto('rgb(0 0 0) 2px 2px, rgb(0 0 0) -2px 2px, rgb(0 0 0) 2px -2px, rgb(0 0 0) -2px -2px')
});





//----------------ESPACIADO--------------------//

const espaciado = document.getElementById("espaciado");
espaciado.addEventListener("input", () => {
	topText.style.padding = espaciado.value + 'px';
	bottomText.style.padding = espaciado.value + 'px';
});

//---------------INTERLINEADO-----------
const interlineado = document.getElementById("interlineado");
interlineado.addEventListener("input", () => {
	topText.style.lineHeight = interlineado.value;
	bottomText.style.lineHeight = interlineado.value;
});

const ajustarImagen = () => {
	imgTextContainer.style.height = `${imgTextContainer.getBoundingClientRect().width
		}px`
}

window.addEventListener('resize', ajustarImagen);


