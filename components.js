// Create a plane material which will receive the shadows.
AFRAME.registerComponent('shadow-material', {
    init: function(){
        let mesh = this.el.getObject3D('mesh');
        if (!mesh){return;}
        mesh.material = new THREE.ShadowMaterial();
        mesh.material.opacity = 0.2;
    }
});
AFRAME.registerComponent('shadow-opts', {
    init: function(){
        // Configure some pretty shadows.
        let light = this.el.getObject3D('light');
        if (!light){return;}
        light.lookAt(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = 0.001;
        const shadowDistance = 8;
        light.shadow.camera.top = shadowDistance;
        light.shadow.camera.bottom = -shadowDistance;
        light.shadow.camera.left = -shadowDistance;
        light.shadow.camera.right = shadowDistance;

        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 50;
        light.shadow.radius = 2;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
    }
});

AFRAME.registerComponent('holostream-component', {
    schema: {
        'url': {default: ''},
        'scale': {default: 6},
    },
    init() {
        this.showedPrompt = false;

        const holoStreamOptions = {
            debugEnabled: false,
            targetCanvasID: '',
            threeScene: document.querySelector("a-scene").object3D,
            threeCamera: document.getElementById("camera").object3D, 
            threeRenderer: this.el.sceneEl.renderer,
            hideUI: true,
            overrideRender: true,
            showPlayButtonOnLoadingScreen: false,
        }
        this.holoStream = new HoloStream(holoStreamOptions);
        this.holoStream.openURL(this.data.url);

        this.data.scale = 2;

        this.placeHologram = (event) => {
    
            const mesh = this.holoStream.getThreeMesh();

            mesh.scale.set(this.data.scale, this.data.scale, this.data.scale);
            mesh.castShadow = true;
            this.el.object3D.add(mesh);

            const maxS = 1;  // scale to this value
            const minS = maxS / 100;  // scale from this value
            this.el.setAttribute('scale', `${minS} ${minS} ${minS}`);
            this.el.setAttribute('visible', 'true');
    
            this.holoStream.handlePlay(true);  // begin playback
    
            this.el.setAttribute('animation__scale', {
                property: 'scale',
                to: `${maxS} ${maxS} ${maxS}`,
                easing: 'easeOutExpo',
                delay: 1000,
                dur: 750,
            });
        }
    },
    tick() {       
        // Show 'Tap to Place Hologram'
        if (!this.showedPrompt) {
            document.getElementById("zappar-placement-ui").addEventListener('click', this.placeHologram, {once: true});
            this.showedPrompt = true;
        }
    },
});
AFRAME.registerPrimitive('holostream-entity', {
    defaultComponents: {
        holostream: {},
    },
    mappings: {
        'src': 'holostream-component.url',
        'holo-scale': 'holostream-component.scale',
    },
});