function Scene() {
    // Load the GLTF model from the public/models directory
    const gltf = useLoader(GLTFLoader, '/models/old_computer/scene.gltf');
  
    // Adjust scale and position
    return (
      <primitive
        object={gltf.scene}
        scale={[2, 2, 2]}
        position={[0, -1.5, 0]} // Adjust Y position as needed
      />
    );
  }
  
  export default Scene;
  