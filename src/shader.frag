#version 120

varying vec3 coordonnee_3d;
varying vec3 coordonnee_3d_locale;
varying vec3 normale;
varying vec4 color;

uniform sampler2D texture;

vec3 light=vec3(0.5,0.5,5.0);
uniform vec4 pos_lamp;
uniform mat4 rot_lamp;


void main (void)
{
    //vecteurs pour le calcul d'illumination
    vec4 light_new = rot_lamp*vec4(-2.0,0.0,0.0,0.0) + pos_lamp ;
    vec3 n = normalize(normale);
    vec3 d = normalize(light_new.xyz-coordonnee_3d_locale);
    vec3 r = reflect(d,n);
    vec3 o = normalize(-coordonnee_3d_locale);

    //calcul d'illumination
    float diffuse  = 0.7*clamp(dot(n,d),0.0,1.0);
    float specular = 0.5*pow(clamp(dot(r,o),0.0,1.0),128.0);
    float ambiant  = 0.2;

    //recuperation de la texture
    vec2 tex_coord     = gl_TexCoord[0].xy;
    vec4 color_texture = texture2D(texture,tex_coord);
    vec4 color_final   = color*color_texture;


    //vecteurs pour le calcul d'illumination
    vec3 n_2 = normalize(normale);
    vec3 d_2 = normalize(light-coordonnee_3d_locale);
    vec3 r_2 = reflect(d_2,n_2);
    vec3 o_2 = normalize(-coordonnee_3d_locale);

    //calcul d'illumination
    float diffuse_2  = 0.2*clamp(dot(n_2,d_2),0.0,1.0);
    float specular_2 = 0.2*pow(clamp(dot(r_2,o_2),0.0,1.0),128.0);
    float ambiant_2  = 0.1;

    vec4 white = vec4(1.0,1.0,1.0,0.0);

    float angle;
    //couleur finale
    angle = dot(d,n);
    angle = max(angle,0);   

   // Test whether vertex is located in the cone
   if(angle > radians(50))
       gl_FragColor = ((ambiant+diffuse)*color_final+specular*vec4(1.0,1.0,1.0,0.0))+((ambiant_2+diffuse_2)*color_final+specular_2*white); // lit (white)
        // gl_FragColor = vec4 (1.0,1.0,1.0,0.0);
   else
       gl_FragColor = ((ambiant+diffuse)*color_final+specular*vec4(0.0,0.0,0.0,1.0))+((ambiant_2+diffuse_2)*color_final+specular_2*white); // unlit(black)  
        // gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    // gl_FragColor = final_color * (ambiant_2+diffuse_2)*color_final+specular_2*white;

}
