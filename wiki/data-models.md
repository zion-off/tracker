users (collection)
  └── userId123 (document)
      ├── created_at: Timestamp
      ├── email: "user@example.com"
      ├── username: "user123"

units (collection)
  └── unitId456 (document)
      ├── units: ["unit1", "unit2", "unit3"]
      ├── owner: /users/userId123 (reference to a user document)

contributions (collection)
  └── "2025-01-15" (document)
      └── users (sub-collection)
          └── userId123 (document)
              ├── counts: {
                    "name1": 10,
                    "name2": 5
                }

chart (collection)
  └── userId123 (document)
        └── years (sub-collection)
            └── "2025" (document)
                ├── 0: 0
                ├── 1: 1
                ├── 2: 1

