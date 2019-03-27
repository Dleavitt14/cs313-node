let express = require("express");

let app = express();
let port = process.env.PORT || 5000;

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/get-rate", getRateHandler);

app.listen(port, function() {
    console.log("Listing on port " + port);
});

function getRateHandler(request, response) {
    let weight = request.query.weight;
    let type = request.query.type;
    let rate = calculateRate(weight, type);

    if (type == "stampedLetters") {
        type = "Letters (Stamped)";
    }
    else if (type == "metered") {
        type = "Letters (Metered)";
    }
    else if (type == "envelopes") {
        type = "Large Envelopes (Flats)";
    }
    else if (type == "firstClass") {
        type = "First-Class Package Service - Retail";
    }

    console.log(type);

    if (typeof rate == "string") {
        let params = {
            error: "There was an error"
        };
    
        response.render("mail", params);
        return;
    }

    let params = {
        rate: rate.toFixed(2),
        weight: weight,
        type: type
    };

    response.render("mail", params);
}

function calculateRate(weight, type) {
    console.log("test");

    weight = Number(weight);

    if (type == "stampedLetters") {
        if (weight <= 1) { 
            return 0.55;
        }
        else if (weight <= 2) {
            return 0.70;
        }
        else if (weight <= 3) {
            return 0.85;
        }
        else if (weight <= 3.5) {
            return 1;
        }
    } 
    else if (type == "metered") {
        if (weight <= 1) { 
            return 0.50;
        }
        else if (weight <= 2) {
            return 0.65;
        }
        else if (weight <= 3) {
            return 0.80;
        }
        else if (weight <= 3.5) {
            return 0.95;
        }
    } 
    else if (type == "envelopes") {
        if (weight <= 1) { 
            return 1;
        }
        else if (weight <= 2) {
            return 1.15;
        }
        else if (weight <= 3) {
            return 1.30;
        }
        else if (weight <= 4) {
            return 1.45;
        }
        else if (weight <= 5) { 
            return 1.60;
        }
        else if (weight <= 6) {
            return 1.75;
        }
        else if (weight <= 7) {
            return 1.90;
        }
        else if (weight <= 8) {
            return 2.05;
        }
        else if (weight <= 9) { 
            return 2.20;
        }
        else if (weight <= 10) {
            return 2.35;
        }
        else if (weight <= 11) {
            return 2.50;
        }
        else if (weight <= 12) {
            return 2.65;
        }
        else if (weight <= 13) {
            return 2.80;
        }
    } 
    else if (type == "firstClass") {
        if (weight <= 4) { 
            return 3.66;
        }
        else if (weight <= 8) {
            return 4.39;
        }
        else if (weight <= 12) {
            return 5.19;
        }
        else if (weight <= 13) {
            return 5.71;
        }
    } 

    console.log("returning error");
    return "error";
}
