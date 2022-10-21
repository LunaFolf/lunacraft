# Server Profiles

The concept of server profiles is `yaml/json/etc` files that can define a structure for a server.

So rather than the Framework defaulting to the usual port, world folder, and other server properties; multiple profiles can be created and you can specify a profile at runtime using an argument, via the `.env` file or potentially have support for a default profile.

---

## Potential format PoC
> :warning: **No file type has been decided yet**: The value(s) below are purely pseudo examples.

```yaml
profile_name: Example1
minecraft_version: 1.19.2
build_override: 220 # optional value, when null Framework will attempt to use the latest version
properties: # A list of server.properties values - will be mapped via Interface
  port: 25575
  world: a_world_name
```
