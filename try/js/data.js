/**
 * DevShop - Product data
 * This file contains the product data for the e-commerce website
 */

// Product categories
const categories = {
    hardware: "Hardware",
    software: "Software",
    books: "Books & Learning",
    merch: "Dev Merch"
  };
  
  // Product data
  const products = [
    {
      id: 1,
      name: "Mechanical Keyboard Pro",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.8,
      reviewCount: 156,
      description: "A premium mechanical keyboard with Cherry MX switches, customizable RGB lighting, and programmable macros. Perfect for developers who spend hours typing.",
      category: "hardware",
      image: "https://images.unsplash.com/photo-1718803448073-90ebd0d982e0?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "https://images.unsplash.com/photo-1700508937657-db513983a2ea?q=80&w=3067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1718803448073-90ebd0d982e0?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1718803448073-90ebd0d982e0?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: true,
      colors: ["Black", "White", "Gray"],
      tags: ["mechanical", "keyboard", "peripherals"],
      stock: 45,
      sku: "KB-MEC-001"
    },
    {
      id: 2,
      name: "Code Editor Pro License",
      price: 99.99,
      originalPrice: 99.99,
      rating: 4.9,
      reviewCount: 280,
      description: "A lifetime license for the most powerful code editor on the market. Includes AI code completion, built-in terminal, and thousands of extensions.",
      category: "software",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: false,
      tags: ["software", "editor", "IDE"],
      stock: 999,
      sku: "SW-IDE-002"
    },
    {
      id: 3,
      name: "4K Monitor for Developers",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviewCount: 108,
      description: "A 32-inch 4K monitor with eye-care technology, perfect for long coding sessions. Features multiple inputs and a highly adjustable stand.",
      category: "hardware",
      image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1593344484962-796055d4a922?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1612798725068-70093d7d3d56?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: true,
      colors: ["Black", "Silver"],
      tags: ["monitor", "display", "4K", "peripherals"],
      stock: 23,
      sku: "HW-MON-003"
    },
    {
      id: 4,
      name: "Modern JavaScript: From Fundamentals to Full Stack",
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.9,
      reviewCount: 215,
      description: "A comprehensive guide to JavaScript programming, covering everything from basic syntax to building complex full-stack applications.",
      category: "books",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: false,
      isOnSale: true,
      tags: ["book", "javascript", "programming"],
      stock: 54,
      sku: "BK-JS-004"
    },
    {
      id: 5,
      name: "Code Debugger Hoodie",
      price: 44.99,
      originalPrice: 44.99,
      rating: 4.6,
      reviewCount: 78,
      description: "A comfortable, premium-quality hoodie with a clever debugging-themed design. Made from 100% organic cotton.",
      category: "merch",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1618354691551-44de113f0164?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: false,
      colors: ["Black", "Gray", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      tags: ["apparel", "hoodie", "swag"],
      stock: 89,
      sku: "MR-HD-005"
    },
    {
      id: 6,
      name: "Wireless Dev Mouse",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.5,
      reviewCount: 92,
      description: "An ergonomic wireless mouse designed specifically for developers, with programmable buttons and ultra-precise tracking.",
      category: "hardware",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1596949089670-a64a38d13f44?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: false,
      isOnSale: true,
      colors: ["Black", "White", "Gray"],
      tags: ["mouse", "peripherals", "wireless"],
      stock: 32,
      sku: "HW-MS-006"
    },
    {
      id: 7,
      name: "Database Management Course",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviewCount: 124,
      description: "A comprehensive video course covering everything from SQL basics to advanced database optimization techniques.",
      category: "software",
      image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: true,
      tags: ["course", "database", "SQL"],
      stock: 999,
      sku: "SW-DB-007"
    },
    {
      id: 8,
      name: "Stack Overflow T-shirt",
      price: 24.99,
      originalPrice: 24.99,
      rating: 4.7,
      reviewCount: 67,
      description: "A comfortable cotton t-shirt with a witty Stack Overflow-inspired design that every developer will appreciate.",
      category: "merch",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600"
      ],
      isNew: true,
      isFeatured: true,
      isOnSale: false,
      colors: ["Black", "White", "Blue", "Red"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      tags: ["apparel", "t-shirt", "swag"],
      stock: 145,
      sku: "MR-TS-008"
    },
    {
      id: 9,
      name: "Algorithm Mastery Book",
      price: 39.99,
      originalPrice: 45.99,
      rating: 4.8,
      reviewCount: 103,
      description: "An essential guide to understanding and implementing complex algorithms, with practical examples in multiple programming languages.",
      category: "books",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1506104489822-562ca25152fe?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: false,
      isOnSale: true,
      tags: ["book", "algorithms", "programming"],
      stock: 28,
      sku: "BK-ALG-009"
    },
    {
      id: 10,
      name: "Cloud Services Management Tool",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.9,
      reviewCount: 87,
      description: "A powerful software tool for managing and optimizing your cloud infrastructure across multiple providers.",
      category: "software",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600"
      ],
      isNew: true,
      isFeatured: true,
      isOnSale: true,
      tags: ["cloud", "DevOps", "management", "software"],
      stock: 15,
      sku: "SW-CLD-010"
    },
    {
      id: 11,
      name: "Portable SSD Drive - 1TB",
      price: 159.99,
      originalPrice: 189.99,
      rating: 4.7,
      reviewCount: 118,
      description: "A fast, durable portable SSD drive with 1TB of storage. Perfect for developers who need to carry large codebases or virtual machines.",
      category: "hardware",
      image: "https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1721333084639-0f64b0583875?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      isNew: false,
      isFeatured: false,
      isOnSale: true,
      colors: ["Black", "Silver"],
      tags: ["storage", "SSD", "hardware"],
      stock: 22,
      sku: "HW-SSD-011"
    },
    {
      id: 12,
      name: "Code Mug",
      price: 14.99,
      originalPrice: 19.99,
      rating: 4.5,
      reviewCount: 234,
      description: "A ceramic coffee mug with a clever programming-related design. Holds 12oz and is microwave and dishwasher safe.",
      category: "merch",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1611145434336-2aa4bf5a3ed1?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: true,
      tags: ["mug", "coffee", "swag"],
      stock: 78,
      sku: "MR-MG-012"
    },
    {
      id: 13,
      name: "Dev Team Collaboration Platform (5 seats)",
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.8,
      reviewCount: 64,
      description: "A comprehensive platform for development team collaboration, including real-time code sharing, integrated CI/CD, and project management tools.",
      category: "software",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1550305080-4e029753abcf?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1596079890701-dd42edf0b7d4?auto=format&fit=crop&w=600"
      ],
      isNew: true,
      isFeatured: false,
      isOnSale: false,
      tags: ["collaboration", "teams", "software"],
      stock: 50,
      sku: "SW-TEAM-013"
    },
    {
      id: 14,
      name: "Bug Hunter Sticker Pack",
      price: 9.99,
      originalPrice: 12.99,
      rating: 4.6,
      reviewCount: 187,
      description: "A pack of 10 high-quality vinyl stickers featuring humorous debugging and programming themes.",
      category: "merch",
      image: "https://images.unsplash.com/photo-1593754500338-969a679d5ca3?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1593754500338-969a679d5ca3?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1608472870996-c17cbc6ec309?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1519248200454-8f2590ed22b7?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: true,
      tags: ["stickers", "swag", "accessories"],
      stock: 125,
      sku: "MR-ST-014"
    },
    {
      id: 15,
      name: "Clean Code: A Handbook of Agile Craftsmanship",
      price: 34.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviewCount: 324,
      description: "A must-read book for any software developer, focusing on principles, patterns, and practices of writing clean, maintainable code.",
      category: "books",
      image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=600"
      ],
      isNew: false,
      isFeatured: true,
      isOnSale: false,
      tags: ["book", "programming", "best practices"],
      stock: 42,
      sku: "BK-CC-015"
    },
    {
      id: 16,
      name: "Laptop Stand for Developers",
      price: 49.99,
      originalPrice: 49.99,
      rating: 4.7,
      reviewCount: 146,
      description: "An adjustable, ergonomic laptop stand perfect for improving posture and comfort during long coding sessions.",
      category: "hardware",
      image: "https://images.unsplash.com/photo-1619855544858-e8e275c3b31a?auto=format&fit=crop&w=600",
      images: [
        "https://images.unsplash.com/photo-1619855544858-e8e275c3b31a?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=600",
        "https://images.unsplash.com/photo-1649834288143-f18a2ff33106?auto=format&fit=crop&w=600"
      ],
      isNew: true,
      isFeatured: true,
      isOnSale: false,
      colors: ["Silver", "Black"],
      tags: ["ergonomic", "laptop", "accessories"],
      stock: 38,
      sku: "HW-LS-016"
    }
  ];
  