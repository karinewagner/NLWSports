import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    "visa": ["#436D99", "#2D57F2"],
    "mastercard": ["#DF6F29", "#C69347"],
    "default": ["back", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0]) 
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      cardType: "visa",
      regex: /^4\d{0,15}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "mastercard",
      regex: /(^5[1,5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")

  ccNumber.innerHTML = number.length === 0 ? "1234 5678 9012 3456" : number
}

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerHTML = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), 
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

expirationDateMasked.on("accept", () => {
updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-expiration .value")
  ccExpiration.innerHTML = date.length === 0 ? "02/32" : date
}

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code){
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerHTML = code.length === 0 ? "123" : code
}

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
})
//addButton -> quem será observado
//addEventListener -> função de ficar observando
//("click", ) -> a ação que será efetuada (clicar no botão)
//( , () => {}) -> a função que será executada quando tiver um evento, (clique do botão)
