import "../styles/index.css";
import "../styles/reset.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = ``;
type productItem = { id: string; name: string; price: number };
type cartItem = { id: string; name: string; quantity: number };
let state: {
  products: productItem[];
  cart: { id: string; name: string; quantity: number }[];
} = {
  products: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.55,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.15,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.25,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.95,
    },
    {
      id: "005-avocado",
      name: "avacado",
      price: 1.5,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.75,
    },
    {
      id: "007-bell-pepper",
      name: "bell-pepper",
      price: 0.95,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.25,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.55,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.85,
    },
  ],
  cart: [],
};

console.log("this is our state :", state);

function makeStoreItem(food: productItem) {
  console.log(food);
  const storeItemEl: Element = document.querySelector(".store--item-list");
  const storeItemListEl = document.createElement("li");

  const storeItemIcon = document.createElement("div");
  storeItemIcon.setAttribute("class", "store--item-icon");

  const itemEl = document.createElement("img");
  itemEl.setAttribute("src", `assets/icons/${food.id}.svg`);
  itemEl.setAttribute("alt", `${food.name}`);

  storeItemIcon.append(itemEl);

  const addToCartBtnEl = document.createElement("button");
  addToCartBtnEl.innerText = "Add to cart";

  addToCartBtnEl.addEventListener("click", function (event) {
    console.log("look this one", food, event);
    const foundItem = state.cart.find(function (cartItem: {
      id: string;
      name: string;
      quantity: number;
    }) {
      console.log("cartitem look", cartItem);
      return cartItem.id === food.id;
    });

    if (foundItem === undefined) {
      const cartItem = {
        id: food.id,
        quantity: 1,
        name: food.name,
      };
      state.cart.push(cartItem);
      console.log("new item added!");
      console.log("inside addtocard function :", cartItem);
    } else {
      foundItem.quantity++;
      console.log("already in basket");
    }
    makeCartItems(state.cart);
    console.log(state);
  });
  storeItemListEl.append(storeItemIcon, addToCartBtnEl);
  storeItemEl.append(storeItemListEl);
}

function makeStoreItems(foods: productItem[]) {
  for (const food of foods) {
    makeStoreItem(food);
  }
}

function makeCartItem(food: cartItem) {
  console.log("inside makeCartItem", food);
  const cartList = document.querySelector(".cart--item-list");

  const liEl = document.createElement("li");

  const imgEl = document.createElement("img");
  imgEl.setAttribute("class", "cart--item-icon");
  imgEl.setAttribute("src", `assets/icons/${food.id}.svg`);
  imgEl.setAttribute("alt", `${food.name}`);

  const pEl = document.createElement("p");
  pEl.innerText = food.name;

  const quantityButtonRemove = document.createElement("button");
  quantityButtonRemove.setAttribute("class", "quantity-btn remove-btn center");
  quantityButtonRemove.innerText = "-";

  quantityButtonRemove.addEventListener("click", function () {
    food.quantity--;
    spanEl.innerText = food.quantity.toString();
    if (food.quantity <= 0) {
      const itemToDelete = state.cart.findIndex(function (cartItem) {
        return cartItem.id === food.id;
      });
      state.cart.splice(itemToDelete, 1);
      makeCartItems(state.cart);
    }
  });

  const spanEl = document.createElement("span");
  spanEl.setAttribute("class", "quantity-text center");
  spanEl.innerText = food.quantity.toString();

  const quantityButtonAdd = document.createElement("button");
  quantityButtonAdd.setAttribute("class", "quantity-btn add-btn center");
  quantityButtonAdd.innerText = "+";

  quantityButtonAdd.addEventListener("click", function () {
    food.quantity++;
    spanEl.innerText = food.quantity.toString();
    console.log("after button add:", food.quantity);
  });

  liEl.append(imgEl, pEl, quantityButtonRemove, spanEl, quantityButtonAdd);
  cartList && cartList.append(liEl);
}

// input:   cart of objects
// action:  take each object and make one list item
// output:  nothing
function makeCartItems(
  cartFoods: { id: string; name: string; quantity: number }[]
) {
  const cartList = document.querySelector(".cart--item-list");
  if (!cartList) return null;
  cartList.innerHTML = " ";
  for (const food of cartFoods) makeCartItem(food);
}

// function makeTotal() {
//   const cash = document.querySelector(".total-number");

//   const itemsToTotal = state.cart.findIndex(function (cartItem) {
//     return cartItem.id === productsItem.id;
//   });

// veg price X quantity
// all items added together

// state.product.price
// match with cart id's
// then multiply
// then add to screen
// }

// makeTotal()

// calling functions
makeCartItems(state.cart);
makeStoreItems(state.products);
// putItemsInCart(state.cart)
