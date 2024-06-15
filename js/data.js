// '2019-11-18T21:31:17.178Z',
// '2019-12-23T07:42:02.383Z',
// ,

const appData = {
  loggedInUser: {
    id: 1,
    name: "Manasse Timóteo",
    role: "Admin",
    token: "abc123token",
    username: "@manassetimoteo",
    userInfo: {
      email: "manassetimoteo@gmail.com",
      phone: "+244 9404 7979",
      bio: "Software developer",
      address: "Angola, Luanda, Cazenga, Combustíveis",
    },
    permissions: [
      "manage_products",
      "manage_inventory",
      "view_sales",
      "manage_clients",
      "generate_reports",
    ],
  },
  weekEarning: 23,
  monthEarnig: 34049505,
  products: [
    {
      id: 101,
      name: "Arca",
      description: "Description of Product A",
      price: 590.99,
      supplier: "Supplier 124",
      category: "Category 1",
      stock: 70,
      alert: 40,
      sales: 45,
      date: "2020-07-12T10:51:36.790Z",
    },
  ],
  inventory: {
    productStock: [
      {
        productId: 101,
        quantity: 50,
      },
      {
        productId: 102,
        quantity: 30,
      },
    ],
    lowStockNotifications: [
      {
        productId: 102,
        message: "Stock for Product B is below the threshold.",
        threshold: 20,
        stock: 12,
        date: "2024-05-19T10:17:24.185Z",
      },
      {
        productId: 101,
        message: "Stock for Product B is below the threshold.",
        threshold: 20,
        stock: 8,
        date: "2024-05-29T08:17:24.185Z",
      },
      {
        productId: 103,
        message: "Stock for Product B is below the threshold.",
        threshold: 20,
        stock: 14,
        date: "2024-05-19T10:17:24.185Z",
      },
    ],
  },
  registerInOutProducts: [
    {
      name: "Massa F",
      quantity: 80,
      productId: 201,
      date: "2024-05-22T10:17:24.185Z",
      category: "Brinquedos",
      type: "entrada",
    },
  ],
  sales: [
    {
      id: 201,
      date: "2024-05-19T16:15:04.904Z",
      clientId: 301,
      totalAmount: 10507.99,
      items: [
        {
          productId: 101,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 102,
          quantity: 1,
          price: 20.99,
        },
        {
          productId: 103,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "pending",
      paymentType: "Cash",
      invoice: {
        id: "INV20240512",
        generatedAt: "2024-05-12T10:00:00Z",
      },
    },
    {
      id: 202,
      date: "2024-05-12T16:15:04.904Z",
      clientId: 302,
      totalAmount: 50507.99,
      items: [
        {
          productId: 104,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 108,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "success",
      paymentType: "Cash",
      invoice: {
        id: "INV20240512",
        generatedAt: "2024-05-12T10:00:00Z",
      },
    },
    {
      id: 203,
      date: "2024-05-19T16:15:04.904Z",
      clientId: 303,
      totalAmount: 5007.99,
      items: [
        {
          productId: 104,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 103,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "pending",
      paymentType: "Cash",
      invoice: {
        id: "INV20240512",
        generatedAt: "2024-05-12T10:00:00Z",
      },
    },
    {
      id: 204,
      date: "2024-05-19T16:15:04.904Z",
      clientId: 301,
      totalAmount: 100507.99,
      items: [
        {
          productId: 105,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 107,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "success",
      paymentType: "Cash",
      invoice: {
        id: "BBV20240512",
        generatedAt: "2024-05-12T10:00:00Z",
      },
    },
    {
      id: 205,
      date: "2024-05-19T16:15:04.904Z",
      clientId: 302,
      totalAmount: 10507.99,
      items: [
        {
          productId: 101,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 102,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "pending",
      paymentType: "Cash",
      invoice: {
        id: "PPNV20240512",
        generatedAt: "2024-02-12T10:00:00Z",
      },
    },
    {
      id: 206,
      date: "2024-05-18T16:15:04.904Z",
      clientId: 303,
      totalAmount: 50507.99,
      items: [
        {
          productId: 101,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 102,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "success",
      paymentType: "Cash",
      invoice: {
        id: "AANV20240512",
        generatedAt: "2024-01-12T10:00:00Z",
      },
    },
    {
      id: 207,
      date: "2024-05-09T16:15:04.904Z",
      clientId: 301,
      totalAmount: 5007.99,
      items: [
        {
          productId: 101,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 102,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "pending",
      paymentType: "Cash",
      invoice: {
        id: "KAV20240512",
        generatedAt: "2024-03-15T10:00:00Z",
      },
    },
    {
      id: 208,
      date: "2024-05-22T16:15:04.904Z",
      clientId: 302,
      totalAmount: 100507.99,
      items: [
        {
          productId: 101,
          quantity: 2,
          price: 10.99,
        },
        {
          productId: 102,
          quantity: 1,
          price: 20.99,
        },
      ],
      status: "success",
      paymentType: "Cash",
      invoice: {
        id: "INV20240512",
        generatedAt: "2024-05-12T10:00:00Z",
      },
    },
  ],
  clients: [
    {
      id: 300,
      name: "Mardoqueu Dickson",
      email: "mardoqueu@gmail.com",
      phone: "1234567890",
      status: "active",
      imgPath: "../assets/img/costumer/costumer1.png",
      address: "123 Street, City, Country",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",
      purchaseHistory: [
        {
          saleId: 204,
          date: "2024-05-12T10:00:00Z",
          invoideID: "IIV20240512",
          totalAmount: 50.99,
          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
      ],
    },

    {
      id: 301,
      name: "Kereni Pembele",
      email: "justina@gmal.com",
      phone: "67867456",
      status: "inactive",
      imgPath: "../assets/img/costumer/costumer2.png",
      address: "123 Street, City, Country",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",
      purchaseHistory: [
        {
          saleId: 201,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 50.99,
          invoideID: "INV20240512",
          items: [
            {
              productId: 103,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 104,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
        {
          saleId: 203,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 50.99,
          invoideID: "BHN20240512",
          items: [
            {
              productId: 102,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 101,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
      ],
    },
    {
      id: 302,
      name: "Marcelina Pembele",
      email: "justina@gmal.com",
      phone: "7854645676",
      status: "inactive",
      imgPath: "../assets/img/costumer/costumer1.png",
      address: "123 Street, City, Country",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",
      purchaseHistory: [
        {
          saleId: 207,
          invoideID: "HGB20240512",
          date: "2024-05-13",
          totalAmount: 456.99,
          items: [
            {
              productId: 103,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
        {
          saleId: 201,
          date: "2024-05-14",
          totalAmount: 340.99,
          invoideID: "AAN20240512",

          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },

        {
          saleId: 202,
          date: "2024-05-19",
          totalAmount: 123.99,
          invoideID: "AAN20240512",

          items: [
            {
              productId: 104,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },

        {
          saleId: 203,
          date: "2024-05-17",
          totalAmount: 689.99,
          invoideID: "AAN20240512",

          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 103,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
        {
          saleId: 204,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 40.99,
          invoideID: "IIV20240512",
          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
      ],
    },
    {
      id: 303,
      name: "Andre Pembele",
      email: "justina@gmal.com",
      phone: "5667567756",
      status: "inactive",
      imgPath: "../assets/img/costumer/costumer2.png",
      address: "123 Street, City, Country",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",
      purchaseHistory: [
        {
          saleId: 208,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 50.99,
          invoideID: "DFH20240512",
          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
      ],
    },
    {
      id: 304,
      name: "Pembele",
      email: "adelino@gmail.com",
      phone: "134545566",
      status: "active",
      imgPath: "../assets/img/costumer/costumer3.jpg",
      address: "123 Street, City, Country",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",

      purchaseHistory: [
        {
          saleId: 201,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 50.99,
          invoideID: "BNH20240512",
          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
        {
          saleId: 204,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 50.99,
          invoideID: "INV20240512",

          items: [
            {
              productId: 103,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 104,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
        {
          saleId: 203,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 50.99,
          invoideID: "HHT20240512",

          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
        {
          saleId: 207,
          date: "2024-05-12T10:00:00Z",
          totalAmount: 50.99,
          invoideID: "INV20240512",
          items: [
            {
              productId: 101,
              quantity: 2,
              price: 10.99,
            },
            {
              productId: 102,
              quantity: 1,
              price: 20.99,
            },
          ],
        },
      ],
    },
  ],
  supplier: [
    {
      id: 301,
      name: "Ricaro Pembele",
      email: "ricardopembele@gmail.com",
      phone: "1234567890",
      address: "123 Street, City, Country",
      products: ["Comprimidos", "Pastas"],
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",
    },

    {
      id: 302,
      name: "Augustina Mpaka",
      email: "augustinampaka@gmail.com",
      phone: "2334345345",
      address: "123 Street, City, Country",
      products: ["Mesas"],
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",
    },

    {
      id: 304,
      name: "Germina Pembele",
      email: "clientone@example.com",
      phone: "1234567890",
      address: "123 Street, City, Country",
      products: ["Computador", "Telefone"],
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro sunt accusamus sed sit officiis, velit, error voluptas rem at provident delectus quam dicta nam, quae minima eaque voluptatem quaerat quasi!",
    },
  ],
  reports: {
    salesByPeriod: [
      {
        period: "2024-05-01 to 2024-05-31",
        totalSales: 344567.9,
        totalOrders: 25,
        totalL: 2340,
        mostSoldProducts: [
          {
            productId: 101,
            quantity: 50,
          },
          {
            productId: 102,
            quantity: 30,
          },
        ],
      },
    ],

    salesByCategory: [
      {
        category: "Electronicos",
        amount: 234545,
      },
      {
        category: "Roupas",
        amount: 54545,
      },
      {
        category: "Cosméticos",
        amount: 72945,
      },
      {
        category: "Calçados",
        amount: 107945,
      },
    ],
    currentStock: [
      {
        productId: 101,
        quantity: 50,
      },
      {
        productId: 102,
        quantity: 30,
      },
    ],
    topSellingProducts: [
      {
        productId: 101,
        sales: 50,
        total: 2395,
      },
      {
        productId: 102,
        sales: 30,
        total: 3495,
      },
    ],
  },
  auth: {
    users: [
      {
        id: 1,
        username: "admin",
        password: "1234",
        role: "Administrador",
      },
      {
        id: 2,
        username: "salesperson",
        password: "password123",
        role: "Vendedor",
      },
    ],
  },
};

// const jsonData = JSON.stringify(appData, null, 2); // O 'null, 2' é para formatação com indentação de 2 espaços
// const sorted = appData.products.sort(
//   (a, b) => new Date(a.date) - new Date(b.date)
// );
// console.log(sorted);
export { appData };
