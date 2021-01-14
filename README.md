# Terrain Generator

--------------------------------------

### How the Terrain Generator Works

* Uses 2 sets of perlin noise
* One set determines the height, which then determines the colour
* One set determines the biome, which then determines how dark the colour is

![Generated Terrain](/images_readme/generated_terrain.PNG)

--------------------------------------

### How are the Terrains Stored?
The terrains are stored in a MongoDB database, and are queried using Graphql.

![Saved Terrains](/images_readme/savedterrains.PNG)

![Example_Saved_Terrain](/images_readme/example_saved_terrain.PNG)

--------------------------------------
