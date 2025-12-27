// Vercel Serverless Function for MZK Pabianice API
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  // Get action from query
  const { action, q, stop } = req.query;
  
  // Info endpoint
  if (action === 'info') {
    return res.status(200).send(
      'MZK Pabianice API Proxy v1.0\n' +
      'oldphonebus.vercel.app\n' +
      'Status: OK\n'
    );
  }
  
  // Test data
  const stops = [
    "Dworzec PKP",
    "Rynek",
    "Plac Kosciuszki",
    "Zamkowa",
    "Warszawska",
    "Bugaj",
    "Geodetow",
    "Manufaktura",
    "Os. Rychtera",
    "Cmentarz"
  ];
  
  // Search endpoint
  if (action === 'search') {
    const query = (q || '').toLowerCase();
    let result = 'OK\n';
    let found = 0;
    
    stops.forEach(stop => {
      if (!query || stop.toLowerCase().includes(query)) {
        result += stop + '\n';
        found++;
      }
    });
    
    if (found === 0) {
      result += 'Brak wynikow\n';
    }
    
    return res.status(200).send(result);
  }
  
  // All stops endpoint
  if (action === 'stops') {
    let result = 'OK\n';
    stops.forEach(stop => {
      result += stop + '\n';
    });
    return res.status(200).send(result);
  }
  
  // Timetable endpoint
  if (action === 'timetable') {
    const stopName = stop || 'Unknown';
    const result = 
      'OK\n' +
      'Przystanek: ' + stopName + '\n' +
      '---\n' +
      'Linia 1:\n' +
      '10:15, 10:45, 11:15, 11:45\n' +
      '---\n' +
      'Linia 2:\n' +
      '10:30, 11:00, 11:30, 12:00\n' +
      '---\n' +
      'Linia 5:\n' +
      '10:20, 10:50, 11:20, 11:50\n' +
      '---\n' +
      '[Testowe dane]\n';
    
    return res.status(200).send(result);
  }
  
  // Unknown action
  return res.status(400).send('ERROR\nUnknown action\n');
};
