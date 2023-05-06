module BABYLON {

    export class Terrain {

        //Number of rings
        gridLevels: number = 8;
        //Resolution of grid
        gridSize: number = 128;
        gridScale: number = 0.3;
        public static detailScale: number = 0.02;
        public static textureScale: number = 30;
        terrainShader: BABYLON.ShaderMaterial;


        /** 贴图尺寸 */
        public static textureSize: number = 512;
        public patch: TerrainPatch;
        public rings: TerrainRing[] = [];

        /** 地形颜色 */
        public static terrainAlbedo: BABYLON.Texture;
        /** 混合颜色 */
        public static materialMix: BABYLON.Texture;
        /** 岩石颜色 */
        public static rockColor: BABYLON.Texture;
        /** 草地颜色 */
        public static grassColor: BABYLON.Texture;
        /** 泥土颜色 */
        public static dirtColor: BABYLON.Texture;

        /** 地形高度 */
        public static terrainHeight: BABYLON.CustomProceduralTexture;
        /** 泥土高度 */
        public static dirtHeight: BABYLON.CustomProceduralTexture;
        /** 草地高度 */
        public static grassHeight: BABYLON.CustomProceduralTexture;
        /** 岩石高度 */
        public static rockHeight: BABYLON.CustomProceduralTexture;

        constructor(name: string, scene: Scene) {


            Terrain.terrainAlbedo = new BABYLON.Texture("./textures/albedo.png", scene);
            Terrain.materialMix = new BABYLON.Texture("./textures/mix.png", scene);
            Terrain.rockColor = new BABYLON.Texture("./textures/rock-color.png", scene);
            Terrain.grassColor = new BABYLON.Texture("./textures/grass-color.png", scene);
            Terrain.dirtColor = new BABYLON.Texture("./textures/dirt-color.png", scene);

            // 加载不同材质的高度贴图着色器
            this.LoadHeights(scene);

            this.patch = new BABYLON.TerrainPatch("terrainpatch", scene, this.gridSize, this.gridScale);

            for (var level = 0; level < this.gridLevels; level++) {
                var scale = this.gridScale * Math.pow(2, level + 1);
                var ring = new BABYLON.TerrainRing("terrainring_" + level, scene, this.gridSize, scale);
                this.rings.push(ring);
            }

        }

        LoadHeights(scene: BABYLON.Scene) {
            var size = Terrain.textureSize;
            var encodedHeight = new BABYLON.Texture("./textures/proc/terrainheight/textures/height.png", scene, false, true, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);

            // 创建自定义贴图
            // 第一个参数：对象名称
            // 第二个参数：程序路径
            // 第三个参数：贴图大小
            // 第四个参数：场景对象
            Terrain.terrainHeight = new BABYLON.CustomProceduralTexture("terrainheight", "./textures/proc/terrainheight", size, scene);
            // 设置高度读取的贴图对象，第一个参数将于着色器中的 uniform 变量名进行对应，第二个参数需要于 uniform 的类型进行对应
            Terrain.terrainHeight.setTexture("source", encodedHeight);
            // 窗口大小
            Terrain.terrainHeight.setVector2("viewport", new BABYLON.Vector2(size, size));
            // 缩放因子
            Terrain.terrainHeight.setFloat("scaleFactor", 0.136439830834);

            var encodedDirtHeight = new BABYLON.Texture("./textures/proc/terrainheight/textures/dirt-height.png", scene);
            Terrain.dirtHeight = new BABYLON.CustomProceduralTexture("dirtheight", "./textures/proc/terrainheight", size, scene);
            // Terrain.dirtHeight.setTexture("source", encodedHeight);
            Terrain.dirtHeight.setTexture("source", encodedDirtHeight);
            Terrain.dirtHeight.setVector2("viewport", new BABYLON.Vector2(size, size));
            Terrain.dirtHeight.setFloat("scaleFactor", 0.0450444817543);

            var encodedGrassHeight = new BABYLON.Texture("./textures/proc/terrainheight/textures/grass-height.png", scene);
            Terrain.grassHeight = new BABYLON.CustomProceduralTexture("grassheight", "./textures/proc/terrainheight", size, scene);
            // Terrain.grassHeight.setTexture("source", encodedHeight);
            Terrain.dirtHeight.setTexture("source", encodedGrassHeight);
            Terrain.grassHeight.setVector2("viewport", new BABYLON.Vector2(size, size));
            Terrain.grassHeight.setFloat("scaleFactor", 0.083146572113);

            var encodedRockHeight = new BABYLON.Texture("./textures/proc/terrainheight/textures/rock-height.png", scene);
            Terrain.rockHeight = new BABYLON.CustomProceduralTexture("rockheight", "./textures/proc/terrainheight", size, scene);
            // Terrain.rockHeight.setTexture("source", encodedHeight);
            Terrain.dirtHeight.setTexture("source", encodedRockHeight);
            Terrain.rockHeight.setVector2("viewport", new BABYLON.Vector2(size, size));
            Terrain.rockHeight.setFloat("scaleFactor", 0.0247397422791);



        }


    }
}


