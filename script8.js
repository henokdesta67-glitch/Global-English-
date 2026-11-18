
/* ==============================
   1. GET HTML ELEMENTS
============================== */

const form = document.getElementById("registrationForm");

const receiptInput = document.getElementById("receipt");

const fileName = document.getElementById("fileName");

const formMessage = document.getElementById("formMessage");


/* ==============================
   2. SHOW SELECTED RECEIPT
============================== */

receiptInput.addEventListener("change", function () {

    const file = receiptInput.files[0];

    if (file) {

        fileName.textContent = file.name;

    } else {

        fileName.textContent = "No file selected";

    }

});


/* ==============================
   3. SHOW MESSAGE
============================== */

function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className = "form-message show " + type;

}


/* ==============================
   4. FORM SUBMISSION
============================== */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    formMessage.className = "form-message";

    // Check required fields
    if (!form.reportValidity()) {
        return;
    }


    /* PHONE VALIDATION */

    const phone = document
        .getElementById("phone")
        .value.trim();

    if (!/^9[0-9]{8}$/.test(phone)) {

        showMessage(
            "Please enter a valid Ethiopian phone number.",
            "error"
        );

        return;
    }


    /* TELEGRAM VALIDATION */

    const telegram = document
        .getElementById("telegram")
        .value.trim();

    if (!/^@?[A-Za-z0-9_]{5,32}$/.test(telegram)) {

        showMessage(
            "Please enter a valid Telegram username.",
            "error"
        );

        return;
    }


    /* RECEIPT VALIDATION */

    const receipt = receiptInput.files[0];

    if (!receipt) {

        showMessage(
            "Please upload your payment receipt.",
            "error"
        );

        return;
    }

    if (receipt.size > 8 * 1024 * 1024) {

        showMessage(
            "Receipt must be smaller than 8 MB.",
            "error"
        );

        return;
    }


    /* COURSE INFORMATION */

    const selectedCourse = form.querySelector(
        'input[name="course"]:checked'
    );

    if (!selectedCourse) {

        showMessage(
            "Please select an English course.",
            "error"
        );

        return;
    }


    /* COLLECT STUDENT INFORMATION */

    const registration = {

        fullName: document
            .getElementById("fullName")
            .value.trim(),

        phone: "+251" + phone,

        email: document
            .getElementById("email")
            .value.trim(),

        telegram: telegram.startsWith("@")
            ? telegram
            : "@" + telegram,

        status: document
            .getElementById("status")
            .value,

        course: selectedCourse.value,

        monthlyFee: Number(
            selectedCourse.dataset.price
        ),

        message: document
            .getElementById("message")
            .value.trim(),

        receiptFileName: receipt.name

    };


    /* TEMPORARY TEST */

    console.log(
        "Global English & Skills Registration:",
        registration
    );

    showMessage(
        "Your information is valid! Supabase and Telegram submission are not connected yet.",
        "success"
    );

});
