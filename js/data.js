// '2019-11-18T21:31:17.178Z',
// '2019-12-23T07:42:02.383Z',
// ,

const appData = {
  loggedInUser: {
    id: 1,
    name: "Admin User",
    role: "Administrador",
    token: "abc123token",
    permissions: [
      "manage_products",
      "manage_inventory",
      "view_sales",
      "manage_clients",
      "generate_reports",
    ],
  },
  weekEarning: 230093,
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
    {
      id: 102,
      name: "Impressora",
      description: "Description of Product A",
      price: 3090.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 70,
      alert: 40,
      sales: 45,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      id: 103,
      name: "Tv Plasma",
      description: "Description of Product A",
      price: 88.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 70,
      alert: 40,
      sales: 45,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      id: 104,
      name: "Calculadora",
      description: "Description of Product A",
      price: 70.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 50,
      alert: 40,
      sales: 45,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      id: 105,
      name: "AC Simba",
      description: "Description of Product A",
      price: 450.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 12,
      alert: 40,
      sales: 45,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      id: 106,
      name: "Mesa",
      description: "Description of Product A",
      price: 110.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 230,
      alert: 40,
      sales: 45,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      id: 107,
      name: "Cadeira",
      description: "Description of Product A",
      price: 800.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 9,
      alert: 40,
      sales: 45,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      id: 108,
      name: "Fones",
      description: "Description of Product A",
      price: 100.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 28,
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
    ],
  },
  registerInOutProducts: [
    {
      name: "Massa F",
      quantity: 80,
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
      id: 301,
      name: "Mardoqueu Dickson",
      email: "mardoqueu@gmail.com",
      phone: "1234567890",
      address: "123 Street, City, Country",
      purchaseHistory: [
        {
          saleId: 201,
          date: "2024-05-12",
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
      id: 302,
      name: "Justina Pembele",
      email: "justina@gmal.com",
      phone: "1234567890",
      address: "123 Street, City, Country",
      purchaseHistory: [
        {
          saleId: 201,
          date: "2024-05-12",
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
      id: 303,
      name: "Adelino Pembele",
      email: "adelino@gmail.com",
      phone: "1234567890",
      address: "123 Street, City, Country",
      purchaseHistory: [
        {
          saleId: 201,
          date: "2024-05-12",
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
  ],
  supplier: [
    {
      id: 301,
      name: "Client One",
      email: "clientone@example.com",
      phone: "1234567890",
      address: "123 Street, City, Country",
    },
  ],
  reports: {
    salesByPeriod: [
      {
        period: "2024-05-01 to 2024-05-31",
        totalSales: 1000.0,
        totalOrders: 25,
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
        quantity: 50,
      },
      {
        productId: 102,
        quantity: 30,
      },
    ],
  },
  auth: {
    users: [
      {
        id: 1,
        username: "admin",
        password: "password123",
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
