const corsOptions = {
  origin: "http://localhost:3000", // Frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
