# Calculadora Análisis Numérico + Parcial Calidad de Software

Este es el readme del proyecto final de análisis numérico en el cual se implementan métodos de resolución de ecuaciones, sistemas de ecuaciones, interpolación e integrales. Además se usa como proyecto base para la ejecución del Parcial final de calidad de software 


## Parcial Calidad de Software
### Parte 1: Estrategia:

 1. Explicar la diferencia entre CI y CD

	**Respuesta:** 
	*Ci:* "Continous integration" es la practica de integrar cambios de codigo en un repositorio compartido varias veces al día, cada integración se valida automáticamente mediante pruebas automatizadas para detectar errores rápidamente.
	*CD:* "Continuos deployment" el código se despliega automáticamente en producción después de pasar todas las pruebas. 
	
 2. Indicar lenguaje, linter y herramienta de cobertura a utilizar, con justificación.
 
	 **Respuesta:**
	*Lenguaje:* Typescript, NodeJS, ReactJS.
	*Linter:* eslint.
	*Herramienta de cobertura:* vitest/coverage-v8.
	Use Vitest/coverage-v8 debido a que es el estándar y la recomendación en proyectos de vite+React 
	
 3. Definir y justificar un umbral mínimo de cobertura (70–90%).
 
	 **Respuesta**
 
	 Se definió un umbral mínimo de cobertura del 80 % para líneas, funciones y sentencias, y del 70 % para ramas.
	 
	Este rango (70–90 %) es recomendado en entornos de desarrollo ágil porque proporciona un equilibrio entre calidad y productividad:

	-   Valores inferiores al 70 % suelen indicar pruebas insuficientes.
	    
	-   Valores superiores al 90–95 % pueden generar sobrecarga innecesaria, obligando a probar código trivial sin valor real.
	    
	-   El 80 % es un estándar ampliamente adoptado en proyectos profesionales, CI/CD corporativo y requisitos académicos.
    

	Este umbral asegura una cobertura adecuada sin detener el avance del proyecto por exigencias excesivas

###  Parte 2:  Workflow CI/CD:

 1. Debe crear .github/workflows/ci-quality.yml con:
	 - Activación en push y pull_request.
	 - Pasos: checkout, instalación dependencias, linter, build, pruebas, cobertura y validación de umbral.
	 - Si alguna etapa falla, el run debe detenerse.

	***Linter***![Prueba Linter](https://i.imgur.com/mKEUrYj.png)

	***Build***
	![Prueba Build](https://i.imgur.com/01czbpe.png)

	***Coverage***
	![Prueba Coverage](https://i.imgur.com/3ZZvJaG.png)

### Parte 3: Uso de nektos/act:

 - Investigar que es ACT.
 
	 act permite ejecutar tus workflows de GitHub Actions de forma local, exactamente como correrían en GitHub.
	
	 **Sirve para:**
	 
	 - Probar tu workflow **sin subir commits ni hacer push**.
	-   Detectar errores de sintaxis, permisos, dependencias o steps.
	-   Simular el entorno de GitHub Actions directamente en tu máquina.
	-   Acelerar la iteración de CI/CD (no esperar a que GitHub Actions corra).
	
	**Requisitos**
		
	 - Docker
				*Verificar instalación:*
					`docker --version`
			 
	 - Instalar Act
		*Usando Chocolatey*
		
	<pre><code class="language-powershell">
	Set-ExecutionPolicy Bypass -Scope Process -Force; `
	[System.Net.ServicePointManager]::SecurityProtocol = `
	[System.Net.ServicePointManager]::SecurityProtocol `
	-bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
	</code></pre>

		choco install act-cli

	- Comando para ejecutar el workflow localmente.
`act -W .github/workflows/ci-quality.yml -P ubuntu-latest=ghcr.io/catthehacker/ubuntu:full-latest`
		

			
### Parte 4: Validación y logs:

 

- Cómo identificar fallos de linter, pruebas y cobertura en logs
 1. Fallos del _linter_ (ESLint)
 
	 *Cómo se ven en logs:*
	 -   El step **Run linter** aparece con X
	-   Se muestran errores de sintaxis o reglas rotas
	-   El workflow se detiene inmediatamente (exit code 1)
	
	Ejemplo de fallo de ESLint![linter fail](https://i.imgur.com/0ZAf0p7.png)
 
2. Fallos en pruebas (Vitest)

	*Cómo se detectan:*

	-   Step **Run tests** falla con ❌
	-   Vitest muestra tests fallando, assertions incorrectas o excepciones
	- Ejemplo de Fallos en los test (Recreacion ya que mi test siempre paso)
	![enter image description here](https://i.imgur.com/YxTm5yJ.png)


3. Fallos por cobertura insuficiente

	Si tienes thresholds definidos en la configuración del proyecto, un porcentaje menor al mínimo genera error.

	- Recracion de coverage insuficiente ![enter image description here](https://i.imgur.com/zoDenSK.png)

4. Run Failed 

	Un run fallido normalmente:
	-   muestra uno o varios steps con X
	-   detiene inmediatamente los pasos siguientes
	-   finaliza con mensajes como:
	- Ejemplo:
![enter image description here](https://i.imgur.com/roMa0fK.png)

		En esta captura se ve un Run fallar puesto que el Linter da un error por una variable que se declara pero no se lee, una vez da el error, el flujo se corta y no se ejecuta el resto.

5. Run Successful

	Un run exitoso:

	-   Todas las etapas aparecen en verde con ✔
	-   No hay mensajes de “Error” o “exit code 1”
	-   Finaliza con un "Success"
	- Ejemplo:
	![enter image description here](https://i.imgur.com/NZef2Du.png)

		Al pasar todas las pruebas todos las ejecuciones son marcadas con ✔

### Parte 5:  IA y Ética

 1. Investigar dos métodos para detectar código generado por IA.
***Respuesta:***

	Herramientas automáticas de detección de código IA, Como
	 

	 - Musely AI Code Checker
	 - Smodin AI Code Detector

	Análisis manual de estilo y estructura

	 - Comentarios genéricos o excesivos. 
	 - Nombres de variables muy
	   literales. 
	  - Falta de modularidad o reutilización.

2. Por qué no es posible asegurar al 100% la autoría.
	***Respuesta:*** 
	
	No es posible asegurar al 100% la autoría de un código porque los estilos de programación pueden imitarse fácilmente, las herramientas de IA generan contenido indistinguible del humano, y no existen huellas digitales confiables en el código que vinculen de forma definitiva a un autor. La detección siempre implica cierto margen de incertidumbre.

3. Proponer políticas razonables de uso de IA en educación y calidad.
	
	Usar la IA como una herramienta para facilitar y acelerar procesos y ayudar en el aprendizaje, mas no usarla como herramienta que haga todo el proyecto, lo llamado "Vibe Coding".
