import "./config/env";

import { app } from "./app";
import { checkDbConnection } from "./config/db.health";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
checkDbConnection();
