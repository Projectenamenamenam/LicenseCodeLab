// Driver License Number formats for all states
export const dlNumberFormats = {
  'Alabama': { format: '7-8 digits', example: '1234567', generator: () => Math.floor(1000000 + Math.random() * 99000000).toString() },
  'Alaska': { format: '7 digits', example: '1234567', generator: () => Math.floor(1000000 + Math.random() * 9000000).toString() },
  'Arizona': { format: '1 letter + 8 digits', example: 'A12345678', generator: () => 'A' + Math.floor(10000000 + Math.random() * 90000000).toString() },
  'Arkansas': { format: '8-9 digits', example: '12345678', generator: () => Math.floor(10000000 + Math.random() * 900000000).toString() },
  'California': { format: '1 letter + 7 digits', example: 'A1234567', generator: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(1000000 + Math.random() * 9000000).toString() },
  'Colorado': { format: '9 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 900000000).toString() },
  'Connecticut': { format: '9 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 900000000).toString() },
  'Delaware': { format: '1-7 digits', example: '1234567', generator: () => Math.floor(1 + Math.random() * 9999999).toString() },
  'Florida': { format: '1 letter + 12 digits', example: 'A123456789012', generator: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(100000000000 + Math.random() * 900000000000).toString() },
  'Georgia': { format: '7-9 digits', example: '12345678', generator: () => Math.floor(1000000 + Math.random() * 99000000).toString() },
  'Hawaii': { format: '1 letter + 8 digits', example: 'H12345678', generator: () => ['H', 'A', 'Z'][Math.floor(Math.random() * 3)] + Math.floor(10000000 + Math.random() * 90000000).toString() },
  'Idaho': { format: '2 letters + 6 digits + 1 letter', example: 'AA123456A', generator: () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * 26)] + 
           letters[Math.floor(Math.random() * 26)] + 
           Math.floor(100000 + Math.random() * 900000).toString() + 
           letters[Math.floor(Math.random() * 26)];
  }},
  'Illinois': { format: '1 letter + 11 digits', example: 'A12345678901', generator: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(10000000000 + Math.random() * 90000000000).toString() },
  'Indiana': { format: '10 digits', example: '1234567890', generator: () => Math.floor(1000000000 + Math.random() * 9000000000).toString() },
  'Iowa': { format: '9 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 900000000).toString() },
  'Kansas': { format: '1 letter + 8 digits', example: 'K12345678', generator: () => 'K' + Math.floor(10000000 + Math.random() * 90000000).toString() },
  'Kentucky': { format: '9 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 900000000).toString() },
  'Louisiana': { format: '1-9 digits', example: '123456', generator: () => Math.floor(1 + Math.random() * 999999999).toString() },
  'Maine': { format: '7 digits', example: '1234567', generator: () => Math.floor(1000000 + Math.random() * 9000000).toString() },
  'Maryland': { format: '1 letter + 12 digits', example: 'M123456789012', generator: () => 'M' + Math.floor(100000000000 + Math.random() * 900000000000).toString() },
  'Massachusetts': { format: 'S + 8 digits', example: 'S12345678', generator: () => 'S' + Math.floor(10000000 + Math.random() * 90000000).toString() },
  'Michigan': { format: '1 letter + 12 digits', example: 'M123456789012', generator: () => 'M' + Math.floor(100000000000 + Math.random() * 900000000000).toString() },
  'Minnesota': { format: '1 letter + 12 digits', example: 'K123456789012', generator: () => ['K', 'L'][Math.floor(Math.random() * 2)] + Math.floor(100000000000 + Math.random() * 900000000000).toString() },
  'Mississippi': { format: '9 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 900000000).toString() },
  'Missouri': { format: '1 letter + 5-9 digits', example: 'M123456', generator: () => {
    const letter = ['M', 'T', 'R'][Math.floor(Math.random() * 3)];
    const digits = Math.floor(10000 + Math.random() * 9990000).toString();
    return letter + digits;
  }},
  'Montana': { format: '13 digits', example: '1234567890123', generator: () => Math.floor(1000000000000 + Math.random() * 9000000000000).toString() },
  'Nebraska': { format: '1 letter + 3-8 digits', example: 'A1234567', generator: () => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const digits = Math.floor(100 + Math.random() * 99999999).toString();
    return letter + digits;
  }},
  'Nevada': { format: '9-10 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 9000000000).toString() },
  'New Hampshire': { format: '2 digits + 3 letters + 5 digits', example: '12ABC12345', generator: () => {
    const num1 = Math.floor(10 + Math.random() * 90).toString();
    let letters = '';
    for (let i = 0; i < 3; i++) {
      letters += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    const num2 = Math.floor(10000 + Math.random() * 90000).toString();
    return num1 + letters + num2;
  }},
  'New Jersey': { format: '1 letter + 14 digits', example: 'N12345678901234', generator: () => 'N' + Math.floor(10000000000000 + Math.random() * 90000000000000).toString() },
  'New Mexico': { format: '8-9 digits', example: '12345678', generator: () => Math.floor(10000000 + Math.random() * 900000000).toString() },
  'New York': { format: '9 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 900000000).toString() },
  'North Carolina': { format: '1-12 digits', example: '1234567890', generator: () => Math.floor(1 + Math.random() * 999999999999).toString() },
  'North Dakota': { format: '3 letters + 6 digits', example: 'ABC123456', generator: () => {
    let letters = '';
    for (let i = 0; i < 3; i++) {
      letters += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    return letters + Math.floor(100000 + Math.random() * 900000).toString();
  }},
  'Ohio': { format: '2 letters + 6 digits', example: 'AB123456', generator: () => {
    let letters = '';
    for (let i = 0; i < 2; i++) {
      letters += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    return letters + Math.floor(100000 + Math.random() * 900000).toString();
  }},
  'Oklahoma': { format: '1 letter + 9 digits', example: 'O123456789', generator: () => 'O' + Math.floor(100000000 + Math.random() * 900000000).toString() },
  'Oregon': { format: '7 digits', example: '1234567', generator: () => Math.floor(1000000 + Math.random() * 9000000).toString() },
  'Pennsylvania': { format: '8 digits', example: '12345678', generator: () => Math.floor(10000000 + Math.random() * 90000000).toString() },
  'Rhode Island': { format: '7 digits', example: '1234567', generator: () => Math.floor(1000000 + Math.random() * 9000000).toString() },
  'South Carolina': { format: '5-11 digits', example: '12345678', generator: () => Math.floor(10000 + Math.random() * 99999999999).toString() },
  'South Dakota': { format: '6-10 digits', example: '123456', generator: () => Math.floor(100000 + Math.random() * 9999999999).toString() },
  'Tennessee': { format: '7-9 digits', example: '1234567', generator: () => Math.floor(1000000 + Math.random() * 999000000).toString() },
  'Texas': { format: '8 digits', example: '12345678', generator: () => Math.floor(10000000 + Math.random() * 90000000).toString() },
  'Utah': { format: '4-10 digits', example: '123456', generator: () => Math.floor(1000 + Math.random() * 9999999999).toString() },
  'Vermont': { format: '8 digits', example: '12345678', generator: () => Math.floor(10000000 + Math.random() * 90000000).toString() },
  'Virginia': { format: '9 characters (mix of letters and numbers)', example: 'A12345678', generator: () => {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }},
  'Washington': { format: '1 letter + 7 digits', example: 'W1234567', generator: () => 'W' + Math.floor(1000000 + Math.random() * 9000000).toString() },
  'West Virginia': { format: '1 letter + 6 digits', example: 'W123456', generator: () => 'W' + Math.floor(100000 + Math.random() * 900000).toString() },
  'Wisconsin': { format: '1 letter + 13 digits', example: 'S1234567890123', generator: () => 'S' + Math.floor(1000000000000 + Math.random() * 9000000000000).toString() },
  'Wyoming': { format: '9 digits', example: '123456789', generator: () => Math.floor(100000000 + Math.random() * 900000000).toString() },
  'District of Columbia': { format: '7 digits', example: '1234567', generator: () => Math.floor(1000000 + Math.random() * 9000000).toString() }
};

// IIN AAMVA for each state
export const iinCodes = {
  'Alabama': '636000',
  'Alaska': '636001',
  'Arizona': '636002',
  'Arkansas': '636003',
  'California': '636004',
  'Colorado': '636005',
  'Connecticut': '636006',
  'Delaware': '636007',
  'Florida': '636008',
  'Georgia': '636009',
  'Hawaii': '636010',
  'Idaho': '636011',
  'Illinois': '636012',
  'Indiana': '636013',
  'Iowa': '636014',
  'Kansas': '636015',
  'Kentucky': '636016',
  'Louisiana': '636017',
  'Maine': '636018',
  'Maryland': '636019',
  'Massachusetts': '636020',
  'Michigan': '636021',
  'Minnesota': '636022',
  'Mississippi': '636023',
  'Missouri': '636024',
  'Montana': '636025',
  'Nebraska': '636026',
  'Nevada': '636027',
  'New Hampshire': '636028',
  'New Jersey': '636029',
  'New Mexico': '636030',
  'New York': '636031',
  'North Carolina': '636032',
  'North Dakota': '636033',
  'Ohio': '636034',
  'Oklahoma': '636035',
  'Oregon': '636036',
  'Pennsylvania': '636037',
  'Rhode Island': '636038',
  'South Carolina': '636039',
  'South Dakota': '636040',
  'Tennessee': '636041',
  'Texas': '636042',
  'Utah': '636043',
  'Vermont': '636044',
  'Virginia': '636045',
  'Washington': '636046',
  'West Virginia': '636047',
  'Wisconsin': '636048',
  'Wyoming': '636049',
  'District of Columbia': '636050'
};

// Eye color options
export const eyeColors = [
  { value: 'BLK', label: 'Black' },
  { value: 'BLU', label: 'Blue' },
  { value: 'BRO', label: 'Brown' },
  { value: 'GRY', label: 'Gray' },
  { value: 'GRN', label: 'Green' },
  { value: 'HAZ', label: 'Hazel' },
  { value: 'MAR', label: 'Maroon' },
  { value: 'PNK', label: 'Pink' },
  { value: 'DIC', label: 'Dichromatic' },
  { value: 'UNK', label: 'Unknown' }
];

// Hair color options
export const hairColors = [
  { value: 'BAL', label: 'Bald' },
  { value: 'BLK', label: 'Black' },
  { value: 'BLN', label: 'Blonde' },
  { value: 'BRO', label: 'Brown' },
  { value: 'GRY', label: 'Gray' },
  { value: 'RED', label: 'Red/Auburn' },
  { value: 'SDY', label: 'Sandy' },
  { value: 'WHI', label: 'White' },
  { value: 'UNK', label: 'Unknown' }
];

// Generates a random alphanumeric string of specified length
export const generateRandomAlphaNumeric = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Helper to format a date as MMDDYYYY
export const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return month + day + year;
};