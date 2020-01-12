<template>
	<div >
		<div id="aside">
            <aside-component></aside-component>   
        </div>
        <div class="container">
            
	         <router-view></router-view>
    	</div>
    </div>

</template>


<script>
	export default{
		name: 'App',
	}

</script>


<style scoped>




</style>