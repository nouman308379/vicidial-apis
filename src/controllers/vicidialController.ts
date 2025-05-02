import { Request, Response } from "express";
import axios from "axios";
import { CONFIG } from "../config/vicidial";

const { API_USERNAME, API_PASSWORD, BASE_URL } = CONFIG;

function validateEnvVars(res: Response): boolean {
  if (!API_USERNAME || !API_PASSWORD || !BASE_URL) {
    res.status(500).json({ error: "Vicidial API credentials are not set" });
    return false;
  }
  return true;
}

export const sendNumber = async (req: Request, res: Response): Promise<void> => {
    const { phoneNumber, firstName, lastName } = req.body;
  
    if (!validateEnvVars(res)) return;
    if (!phoneNumber) {
      res.status(400).json({ error: "Phone number is required" });
      return;
    }
  
    const sanitizedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber.slice(1)
      : phoneNumber;
  
    const encodedFirstName = encodeURIComponent(firstName || "");
    const encodedLastName = encodeURIComponent(lastName || "");
  
    const url = `${BASE_URL}?user=${API_USERNAME}&pass=${API_PASSWORD}&function=add_lead&source=GoHighLevel&phone_number=${sanitizedPhoneNumber}&list_id=1234&duplicate_check=DUPCHECK&first_name=${encodedFirstName}&last_name=${encodedLastName}`;
  
    try {
      const { data } = await axios.get(url);
      console.log("✅ Vicidial API Response:", data);
      res.status(200).json({ message: "Phone number submitted successfully", response: data });
    } catch (error: any) {
      console.error("❌ Error calling Vicidial API:", error.message);
      res.status(500).json({ error: "Failed to submit phone number to Vicidial API" });
    }
  };
  

export const updateLead = async (req: Request, res: Response): Promise<void> => {
  const { leadId, phoneNumber, firstName, lastName } = req.body;

  if (!validateEnvVars(res)) return;
  if (!leadId || !phoneNumber) {
    res.status(400).json({ error: "leadId and phoneNumber are required" });
    return;
  }

  const sanitizedPhoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber.slice(1)
    : phoneNumber;

  const url = `${BASE_URL}?source=GoHighLevel&user=${API_USERNAME}&pass=${API_PASSWORD}&function=update_lead&lead_id=${leadId}&phone_number=${sanitizedPhoneNumber}&first_name=${encodeURIComponent(
    firstName || ""
  )}&last_name=${encodeURIComponent(lastName || "")}`;

  try {
    const { data } = await axios.get(url);
    console.log("✅ Vicidial API Update Response:", data);
    res.status(200).json({ message: "Contact updated successfully", response: data });
  } catch (error: any) {
    console.error("❌ Error updating Vicidial contact:", error.message);
    res.status(500).json({ error: "Failed to update contact in Vicidial API" });
  }
};

export const handleCallStatus = (req: Request, res: Response): void => {
  const {
    lead_id,
    phone_number,
    status,
    call_date,
    agent,
    campaign_id,
    list_id,
    user_group,
    comments,
  } = req.body;

  console.log("📞 Received call status from Vicidial:", {
    lead_id,
    phone_number,
    status,
    call_date,
    agent,
    campaign_id,
    list_id,
    user_group,
    comments,
  });

  res.status(200).json({ message: "Call status received successfully" });
};
