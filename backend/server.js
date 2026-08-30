require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Resend
const resend = new Resend(process.env.RESEND_API_KEY);


// Home route
app.get("/", (req, res) => {
    res.send("Portfolio backend is running!");
});


// Contact form
app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        // Validate fields
        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                message: "Please fill in all fields."
            });

        }


        // Send email
        const { data, error } = await resend.emails.send({

            from: "Portfolio <onboarding@resend.dev>",

            to: [process.env.EMAIL_USER],

            replyTo: email,

            subject: `Portfolio Contact: ${subject}`,

            html: `
                <h2>New Portfolio Contact</h2>

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

                <hr>

                <h3>Message</h3>

                <p>
                    ${message}
                </p>
            `
        });


        // Resend error
        if (error) {

            console.error("Resend error:", error);

            return res.status(500).json({
                message: "Failed to send email."
            });

        }


        console.log("Email sent successfully:", data);


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


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});