const data = [
  {
    "Name": "Spaghetti Bolognese",
    "Category": "Pasta",
    "Image": "https://peopleenespanol.com/thmb/6t7A-dem6ZyHI6zXy62cQ-0MBJY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/recetas-4115-spaghetti-boloesa-facil-2000-d4cbc49cc28d4e78bf8266662cc037e1.jpg",
    "Price": "12.99",
    "Ingredients": ["Spaghetti", "ground beef", "tomatoes", "onions", "garlic"],
    "Description": "Classic Italian dish with a rich meat sauce"
  },
  {
    "Name": "Chicken Alfredo",
    "Category": "Pasta",
    "Image": "https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg",
    "Price": "14.99",
    "Ingredients": ["Fettuccine", "grilled chicken", "cream", "Parmesan cheese"],
    "Description": "Creamy pasta dish with grilled chicken"
  },
  {
    "Name": "Margherita Pizza",
    "Category": "Pizza",
    "Image": "https://resizer.glanacion.com/resizer/v2/la-pizza-margarita-lleva-los-colores-de-la-M7NX62ONAJGRHMGZQKL3UMOIG4.jpeg?auth=95a4f0c18b4249f8a85c43e89ed95fc56dbfa22ac852945962285bb3c2638680&width=768&height=512&quality=70&smart=true",
    "Price": "10.99",
    "Ingredients": ["Pizza dough", "tomatoes", "mozzarella cheese", "basil"],
    "Description": "Traditional Neapolitan pizza with fresh tomatoes and mozzarella"
  },
  {
    "Name": "Pepperoni Pizza",
    "Category": "Pizza",
    "Image": "https://www.sortirambnens.com/wp-content/uploads/2019/02/pizza-de-peperoni.jpg",
    "Price": "12.99",
    "Ingredients": ["Pizza dough", "tomato sauce", "mozzarella cheese", "pepperoni"],
    "Description": "Classic pizza topped with pepperoni slices"
  },
  {
    "Name": "Caesar Salad",
    "Category": "Salad",
    "Image": "https://www.seriouseats.com/thmb/Fi_FEyVa3_-_uzfXh6OdLrzal2M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-caesar-salad-recipe-06-40e70f549ba2489db09355abd62f79a9.jpg",
    "Price": "8.99",
    "Ingredients": ["Romaine lettuce", "croutons", "Parmesan cheese", "Caesar dressing"],
    "Description": "Crisp salad with a tangy Caesar dressing"
  },
  {
    "Name": "Caprese Salad",
    "Category": "Salad",
    "Image": "https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Caprese-salad-8f218a3.png?quality=90&webp=true&resize=375,341",
    "Price": "9.99",
    "Ingredients": ["Tomatoes", "mozzarella cheese", "basil", "balsamic glaze"],
    "Description": "Refreshing salad with fresh tomatoes and mozzarella"
  },
  {
    "Name": "Beef Burger",
    "Category": "Burger",
    "Image": "https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg",
    "Price": "11.99",
    "Ingredients": ["Beef patty", "lettuce", "tomato", "onion", "pickles", "brioche bun"],
    "Description": "Juicy burger with classic toppings"
  },
  {
    "Name": "Veggie Burger",
    "Category": "Burger",
    "Image": "",
    "Price": "10.99",
    "Ingredients": ["Veggie patty", "lettuce", "tomato", "onion", "avocado", "multigrain bun"],
    "Description": "Delicious vegetarian burger option"
  },
  {
    "Name": "Fish and Chips",
    "Category": "Seafood",
    "Image": "https://imag.bonviveur.com/fish-and-chips-el-tradicional-plato-britanico.jpg",
    "Price": "13.99",
    "Ingredients": ["Battered fish", "French fries", "tartar sauce"],
    "Description": "Classic British dish with crispy fried fish"
  },
  {
    "Name": "Grilled Salmon",
    "Category": "Seafood",
    "Image": "https://hips.hearstapps.com/hmg-prod/images/how-to-grill-salmon-recipe1-1655870645.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
    "Price": "15.99",
    "Ingredients": ["Fresh salmon", "lemon", "dill", "roasted vegetables"],
    "Description": "Healthy option with grilled salmon fillet"
  },
  {
    "Name": "Pesto Pasta",
    "Category": "Pasta",
    "Image": "https://vancouverwithlove.com/wp-content/uploads/2023/08/pasta-al-pesto-24-1.jpg",
    "Price": "11.99",
    "Ingredients": ["Pasta", "basil pesto", "cherry tomatoes", "Parmesan cheese"],
    "Description": "Delicious pasta dish with basil pesto sauce"
  },
  {
    "Name": "Mushroom Pizza",
    "Category": "Pizza",
    "Image": "https://www.allrecipes.com/thmb/3qkooqf4vsQ3DjzjIZy0s6ZSwC0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/36107allies-mushroom-pizzafabeveryday4x3-005f809371b147378094d60f28daf212.jpg",
    "Price": "13.99",
    "Ingredients": ["Pizza dough", "mozzarella cheese", "mushrooms", "garlic", "olive oil"],
    "Description": "Pizza topped with savory mushrooms and garlic"
  },
  {
    "Name": "Greek Salad",
    "Category": "Salad",
    "Image": "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/08/Greek-Salad-6-1.jpg",
    "Price": "9.99",
    "Ingredients": ["Cucumbers", "tomatoes", "red onion", "Kalamata olives", "feta cheese", "Greek dressing"],
    "Description": "Fresh and flavorful salad with Mediterranean ingredients"
  },
  {
    "Name": "Cheeseburger",
    "Category": "Burger",
    "Image": "https://recipes.net/wp-content/uploads/2023/05/hardees-double-cheeseburger-recipe_d48b79ef43b714e98a3ad95a7ab9e12e-768x768.jpeg",
    "Price": "12.99",
    "Ingredients": ["Beef patty", "American cheese", "lettuce", "tomato", "onion", "pickles", "brioche bun"],
    "Description": "Classic cheeseburger with all the fixings"
  },
  {
    "Name": "Shrimp Scampi",
    "Category": "Seafood",
    "Image": "https://www.allrecipes.com/thmb/jiV_4f8vXFle1RdFLgd8-_31J3M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229960-shrimp-scampi-with-pasta-DDMFS-4x3-e065ddef4e6d44479d37b4523808cc23.jpg",
    "Price": "16.99",
    "Ingredients": ["Shrimp", "butter", "garlic", "white wine", "lemon juice", "parsley"],
    "Description": "Garlicky shrimp sautéed in butter and white wine sauce"
  },
  {
    "Name": "Lasagna",
    "Category": "Pasta",
    "Image": "https://content-cocina.lecturas.com/medio/2023/07/29/lasana-de-carne-a-la-sarten_00000000_231010171454_1200x1200.jpg",
    "Price": "16.99",
    "Ingredients": ["Lasagna noodles", "ground beef", "ricotta cheese", "mozzarella cheese", "tomato sauce"],
    "Description": "Layers of pasta with meat sauce and cheese"
  },
  {
    "Name": "Carbonara",
    "Category": "Pasta",
    "Image": "https://i.blogs.es/8819e1/carbonara-rec/650_1200.jpg",
    "Price": "13.99",
    "Ingredients": ["Spaghetti", "bacon", "egg yolks", "Parmesan cheese", "black pepper"],
    "Description": "Creamy pasta dish with bacon and cheese"
  },
  {
    "Name": "Hawaiian Pizza",
    "Category": "Pizza",
    "Image": "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/11/como-hacer-pizza-hawaiana.jpg",
    "Price": "12.99",
    "Ingredients": ["Pizza dough", "tomato sauce", "mozzarella cheese", "pineapple", "ham"],
    "Description": "Pizza with pineapple and ham toppings"
  },
  {
    "Name": "Cobb Salad",
    "Category": "Salad",
    "Image": "https://www.allrecipes.com/thmb/lUCXnzWTl9WOQ9NRAT08hA4O2lE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14415-cobb-salad-DDMFS-4x3-608ba9c5768b49079eb75fe9a9898307.jpg",
    "Price": "10.99",
    "Ingredients": ["Romaine lettuce", "grilled chicken", "avocado", "hard-boiled eggs", "bacon", "blue cheese", "tomatoes", "balsamic vinaigrette"],
    "Description": "Hearty salad with a variety of toppings"
  },
  {
    "Name": "Turkey Burger",
    "Category": "Burger",
    "Image": "https://static01.nyt.com/images/2014/04/02/dining/Turkey-Burgers/Turkey-Burgers-superJumbo.jpg",
    "Price": "10.99",
    "Ingredients": ["Turkey patty", "lettuce", "tomato", "red onion", "avocado", "whole wheat bun"],
    "Description": "Lean and flavorful turkey burger"
  },
  {
    "Name": "Clam Chowder",
    "Category": "Seafood",
    "Image": "https://assets.elgourmet.com/wp-content/uploads/2023/03/clam-_GOIHPzsbhFEpiMQka3vgTd4e172u69-1024x683.png.webp",
    "Price": "14.99",
    "Ingredients": ["Clams", "potatoes", "onion", "celery", "bacon", "heavy cream", "butter", "flour"],
    "Description": "Rich and creamy clam soup"
  },
  {
    "Name": "Fettuccine Alfredo",
    "Category": "Pasta",
    "Image": "https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1-1200x1182.jpg",
    "Price": "15.99",
    "Ingredients": ["Fettuccine", "heavy cream", "butter", "Parmesan cheese", "garlic", "parsley"],
    "Description": "Indulgent pasta dish with creamy Alfredo sauce"
  },
  {
    "Name": "Meat Lover's Pizza",
    "Category": "Pizza",
    "Image": "https://www.thespruceeats.com/thmb/xuxwh4RIGcZMgaJE8u3SueM0SoA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/aqIMG_4568fhor-0b89dc5c8c494ee9828ed29805791c5a.jpg",
    "Price": "14.99",
    "Ingredients": ["Pizza dough", "tomato sauce", "mozzarella cheese", "pepperoni", "sausage", "bacon", "ham"],
    "Description": "Pizza loaded with various meats"
  },
  {
    "Name": "Waldorf Salad",
    "Category": "Salad",
    "Image": "https://www.simplyrecipes.com/thmb/1diOxNqUS9hd9J6vF_SvCtKNpus=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2007__10__waldorf-salad-horiz-a-1500-f54f0588f23d4f51b8d92469e6d81cf1.jpg",
    "Price": "11.99",
    "Ingredients": ["Apples", "celery", "grapes", "walnuts", "mayonnaise", "lemon juice", "lettuce"],
    "Description": "Refreshing salad with fruit and nuts"
  }
];

export default data;
