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
  products: [
    {
      id: 101,
      name: "Product A",
      description: "Description of Product A",
      price: 10.99,
      supplier: "Supplier X",
      category: "Category 1",
      stock: 50,
    },
    {
      id: 102,
      name: "Product B",
      description: "Description of Product B",
      price: 20.99,
      supplier: "Supplier Y",
      category: "Category 2",
      stock: 30,
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
      date: "2024-05-12",
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
      paymentStatus: "Paid",
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

const jsonData = JSON.stringify(appData, null, 2); // O 'null, 2' é para formatação com indentação de 2 espaços

export { jsonData };
