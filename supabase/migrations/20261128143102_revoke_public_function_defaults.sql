-- PostgreSQL grants EXECUTE on new functions to PUBLIC by default.
-- Revoke this globally for functions created by postgres; future migrations
-- must explicitly grant execution only to the roles that need it.
alter default privileges for role postgres
  revoke execute on functions from public;
