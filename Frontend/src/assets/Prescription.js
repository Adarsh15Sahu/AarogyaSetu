const prescription = [
    {
        prescriptionId: "PRESC001",
        patientId: "HC-P-87654321",
        doctorId: "DOC001",
        symptoms: "Fever, headache",
        diagnosis: "Viral Fever",
        medicines: [
            { name: "Paracetamol", dosage: "500 mg", duration: "5 days" },
            { name: "ORS", dosage: "Twice daily", duration: "3 days" }
        ],
        advice: "Drink plenty of fluids",
        prescribedOn: "2025-01-05"
    },
    {
        prescriptionId: "PRESC002",
        patientId: "HC-P-87654321",
        doctorId: "DOC002",
        symptoms: "Sneezing, itchy eyes",
        diagnosis: "Seasonal Allergy",
        medicines: [
            { name: "Cetirizine", dosage: "Once daily", duration: "7 days" }
        ],
        advice: "Avoid dust and pollen",
        prescribedOn: "2024-11-20"
    },
    {
        prescriptionId: "PRESC003",
        patientId: "HC-P-12345678",
        doctorId: "DOC003",
        symptoms: "Ankle pain",
        diagnosis: "Minor Sprain",
        medicines: [
            { name: "Pain Relief Gel", dosage: "Apply twice", duration: "10 days" }
        ],
        advice: "Rest and ice therapy",
        prescribedOn: "2024-10-02"
    }
];

export default prescription;
