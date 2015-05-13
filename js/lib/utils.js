var Utils = {
	assert: function (condition, message) {
		if (condition === false) { alert(message); }
	},

	log: function (message) {
		console.log(message);
	},

	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	loadFileAsText: function (url) {
		var req = new XMLHttpRequest();
		req.open("GET", url, false);
		req.send(null);
		return (req.status == 200) ? req.responseText : null;
	},

	scaleMesh: function (mesh, scale) {
		mesh.geometry.applyMatrix(new THREE.Matrix4().makeScale(10, 10, 10));
	},

	moveMesh: function (mesh, x, y, z) {
		mesh.position.set(x, y, z);  
	},


	shiftMesh: function (mesh, dx, dy, dlift) {
		mesh.position.x += dx;
		mesh.position.y += dlift;
		mesh.position.z += dy;
	},

	setMeshUv: function (mesh, x, y, width, height, textureWidth, textureHeight) {
		var uvs = mesh.geometry.faceVertexUvs[0];

		var top = 1 - y / textureHeight;
		var bottom = 1 - (y + height - 0.1) / textureHeight;

		uvs[0][0].y = top;
		uvs[0][1].y = bottom;
		uvs[0][2].y = top;
		uvs[1][0].y = bottom;
		uvs[1][1].y = bottom;
		uvs[1][2].y = top;  
		

		var left = (x + 0.1) / textureWidth;
		var right = (x + width) / textureWidth;

		uvs[0][0].x = left;
		uvs[0][1].x = left;
		uvs[0][2].x = right;
		uvs[1][0].x = left;
		uvs[1][1].x = right;
		uvs[1][2].x = right;   
		
		mesh.geometry.uvsNeedUpdate = true;
	},

	setMeshTint: function (mesh, r, g, b) {
		for (var i = 0; i < mesh.geometry.faces.length; ++i) 
		{
			mesh.geometry.faces[i].color.setRGB(r, g, b);
		}
		
		mesh.geometry.colorsNeedUpdate = true;
	},

	createPlaneMesh: function (width, height, material, billboard) {
		var geometry = new THREE.PlaneGeometry(width, height);
		
		var mesh = new THREE.Mesh(geometry, material);;
		
		geometry.computeVertexNormals();
		geometry.computeTangents();

		if (billboard) { mesh.rotation.set(0, Math.PI, 0); }

		this.setMeshTint(mesh, 1, 1, 1);

		return mesh;
	}
};