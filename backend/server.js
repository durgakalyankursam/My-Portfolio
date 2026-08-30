require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");


const app = express();

app.use(cors());

app.use(express.json());



app.get("/", (req, res) => {
    res.send("Portfolio backend is running!");
});

// EMAIL CONFIGURATION

app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                message: "Please fill in all fields."
            });

        }


        const { data, error } = await resend.emails.send({

            from: "Portfolio <onboarding@resend.dev>",

            to: [process.env.EMAIL_USER],

            replyTo: email,

            subject: `Portfolio Contact: ${subject}`,

            html: `
                <h2>New Portfolio Contact</h2>

                <p>
                    <strong>Name:</strong> ${name}
                </p>

                <p>
                    <strong>Email:</strong> ${email}
                </p>

                <p>
                    <strong>Subject:</strong> ${subject}
                </p>

                <hr>

                <p>
                    <strong>Message:</strong>
                </p>

                <p>
                    ${message}
                </p>
            `
        });


        if (error) {

            console.error("Resend error:", error);

            return res.status(500).json({
                message: "Failed to send email."
            });

        }


        console.log("Email sent:", data);

        res.status(200).json({
            message: "Message sent successfully!"
        });


    } catch (error) {

        console.error("Server error:", error);

        res.status(500).json({
            message: "Something went wrong."
        });

    }

});

// CONTACT API

app.post(
  "/api/contact",
  async (req, res) => {

    try {

      const {
        name,
        email,
        subject,
        message
      } = req.body;


      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {

        return res.status(400).json({
          message:
            "All fields are required."
        });
      }


      const mailOptions = {

        from:
          process.env.EMAIL_USER,

        to:
          process.env.EMAIL_USER,

        replyTo:
          email,

        subject:
          `Portfolio Contact: ${subject}`,

        html: `
          <h2>New Portfolio Message</h2>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Subject:</strong>
            ${subject}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${message}
          </p>
        `
      };


      await transporter.sendMail(
        mailOptions
      );


      res.status(200).json({

        message:
          "Email sent successfully!"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Something went wrong."
      });
    }
  }
);


// START SERVER

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});