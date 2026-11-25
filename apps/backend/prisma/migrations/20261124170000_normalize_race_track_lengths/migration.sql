UPDATE "Race"
SET "trackLength" = regexp_replace("trackLength", '[[:space:]]*km$', '', 'i')
WHERE "trackLength" ~* '^[0-9]+([.][0-9]+)?[[:space:]]*km$';
