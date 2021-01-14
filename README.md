# Terrain Generator

--------------------------------------

### How the Terrain Generator Works

* Uses 2 sets of perlin noise
* One set determines the height, which then determines the colour
* One set determines the biome, which then determines how dark the colour is

![Generated Terrain](/Terrain.PNG)

--------------------------------------

### How are the Terrains Stored?
The terrains are stored in a MongoDB database, and are queried using Graphql.

![Saved Terrains](/savedTerrainlist.PNG)

![Example_Saved_Terrain](/savedTerrainExample.PNG)

--------------------------------------
