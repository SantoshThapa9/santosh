require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const validateEmail = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("message").notEmpty().withMessage("Message is required"),
];

app.post("/send", validateEmail, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .send({ message: "Failed to send message", error: error.toString() });
    }
    res.status(200).send({ message: "Message sent successfully!", info });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
