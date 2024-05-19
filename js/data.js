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
      name: "Computador",
      description: "Description of Product A",
      price: 100.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 70,
      sales: 45,
      date: new Date(),
    },
    {
      id: 102,
      name: "Computador",
      description: "Description of Product A",
      price: 34.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 50,
      sales: 45,
      date: new Date(),
    },
    {
      id: 103,
      name: "Impressora",
      description: "Description of Product B",
      price: 20.99,
      supplier: "Supplier Y",
      category: "Category 2",
      stock: 10,
      sales: 45,
      date: new Date(),
    },
    {
      id: 104,
      name: "Impressora",
      description: "Description of Product B",
      price: 450.99,
      supplier: "Supplier Y",
      category: "Category 2",
      stock: 450,
      sales: 105,
      date: new Date(),
    },
    {
      id: 105,
      name: "Impressora",
      description: "Description of Product B",
      price: 28.99,
      supplier: "Supplier Y",
      category: "Category 2",
      stock: 300,
      sales: 205,
      date: new Date(),
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
      },
    ],
  },
  sales: [
    {
      id: 201,
      date: new Date(),
      clientId: 301,
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
      paymentStatus: "Pago",
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
      name: "Client One",
      email: "clientone@example.com",
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

export { appData };
